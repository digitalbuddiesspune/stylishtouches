import axios from "axios";
import { generateHash } from "../utils/generateHash.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import ContactLens from "../models/ContactLens.js";
import Accessory from "../models/Accessory.js";
import SkincareProduct from "../models/SkincareProduct.js";
import Bag from "../models/Bag.js";
import MensShoe from "../models/MensShoe.js";
import WomensShoe from "../models/WomensShoe.js";

// -------- Resolve Item - Handle all product types --------
async function resolveItem(productId) {
  let doc = await Product.findById(productId).lean();
  if (doc) return { ...doc, _type: 'product', price: doc.price || 0 };
  
  doc = await ContactLens.findById(productId).lean();
  if (doc) return { ...doc, _type: 'contactLens', price: doc.price || 0 };
  
  doc = await Accessory.findById(productId).lean();
  if (doc) return { ...doc, _type: 'accessory', price: doc.finalPrice || doc.price || 0 };
  
  doc = await SkincareProduct.findById(productId).lean();
  if (doc) return { ...doc, _type: 'skincare', price: doc.finalPrice || doc.price || 0 };
  
  doc = await Bag.findById(productId).lean();
  if (doc) return { ...doc, _type: 'bag', price: doc.finalPrice || doc.price || 0 };
  
  doc = await MensShoe.findById(productId).lean();
  if (doc) return { ...doc, _type: 'mensShoe', price: doc.finalPrice || doc.price || 0 };
  
  doc = await WomensShoe.findById(productId).lean();
  if (doc) return { ...doc, _type: 'womensShoe', price: doc.finalPrice || doc.price || 0 };
  
  return null;
}

/**
 * Create Payment Request
 * POST /api/payment/create
 * Creates order first, then initiates payment gateway request
 */
export const createPayment = async (req, res) => {
  try {
    const { amount, name, email, phone, shippingAddress } = req.body;

    // Validate required fields
    if (!amount || !name || !email || !phone || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: amount, name, email, phone, shippingAddress"
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    // Resolve cart items
    const items = [];
    for (const it of cart.items) {
      const resolved = await resolveItem(it.productId);
      if (!resolved) {
        console.warn(`Could not resolve product ${it.productId}`);
        continue;
      }
      items.push({
        productId: it.productId,
        quantity: it.quantity,
        price: resolved.price || 0
      });
    }

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid products found in cart"
      });
    }

    const computedAmount = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const finalAmount = amount > 0 ? Number(amount) : computedAmount;

    // Create order first
    const order = new Order({
      userId: req.user.id,
      items,
      shippingAddress,
      totalAmount: finalAmount,
      paymentDetails: {
        paymentMethod: 'online',
        status: 'pending'
      },
      status: 'pending'
    });

    await order.save();

    // Generate unique order ID for payment gateway (use MongoDB _id as string)
    const orderId = `ORD_${order._id.toString()}`;

    // Validate environment variables
    if (!process.env.PG_API_URL || !process.env.PG_API_KEY || !process.env.PG_SALT) {
      return res.status(500).json({
        success: false,
        message: "Payment gateway configuration missing"
      });
    }

    const payload = {
      api_key: process.env.PG_API_KEY,
      order_id: orderId,
      amount: finalAmount,
      currency: "INR",
      description: `Order Payment - ${orderId}`,
      name,
      email,
      phone,
      city: shippingAddress?.city || "Pune",
      country: "IND",
      zip_code: shippingAddress?.zipCode || "411001",
      return_url: `${process.env.BACKEND_URL}/api/payment/success`,
      return_url_failure: `${process.env.BACKEND_URL}/api/payment/failure`,
      mode: process.env.PG_MODE || "LIVE"
    };

    // Generate hash
    payload.hash = generateHash(payload, process.env.PG_SALT);

    // Call Payment Gateway API
    const response = await axios.post(
      `${process.env.PG_API_URL}/v2/paymentrequest`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400
      }
    );

    // Extract redirect URL from response
    let redirectUrl = null;
    if (response.request?.res?.responseUrl) {
      redirectUrl = response.request.res.responseUrl;
    } else if (response.data?.redirect_url) {
      redirectUrl = response.data.redirect_url;
    } else if (response.data?.url) {
      redirectUrl = response.data.url;
    } else if (typeof response.data === 'string' && response.data.startsWith('http')) {
      redirectUrl = response.data;
    }

    if (!redirectUrl) {
      console.error("Payment Gateway Response:", response.data);
      // Update order status to failed
      order.paymentDetails.status = 'failed';
      order.paymentDetails.errorMessage = 'Failed to get redirect URL from payment gateway';
      await order.save();
      
      return res.status(500).json({
        success: false,
        message: "Failed to get redirect URL from payment gateway",
        debug: response.data
      });
    }

    // Store order ID in payment details for reference
    order.paymentDetails.gatewayOrderId = orderId;
    await order.save();

    res.json({
      success: true,
      redirectUrl,
      orderId: order._id
    });

  } catch (error) {
    console.error("Create Payment Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create payment request",
      error: error.response?.data || error.message
    });
  }
};

/**
 * Verify Payment Status (Mandatory)
 * This should be called after receiving callback to verify payment
 */
export const verifyPaymentStatus = async (orderId) => {
  try {
    const payload = {
      api_key: process.env.PG_API_KEY,
      order_id: orderId
    };

    payload.hash = generateHash(payload, process.env.PG_SALT);

    const response = await axios.post(
      `${process.env.PG_API_URL}/v2/paymentstatus`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Verify Payment Status Error:", error);
    throw error;
  }
};

/**
 * Payment Success Callback
 * POST /api/payment/success or GET /api/payment/success
 * Handles both POST (form data) and GET (query params) from payment gateway
 */
export const paymentSuccess = async (req, res) => {
  try {
    // Handle both POST (body) and GET (query) parameters
    const data = { ...req.body, ...req.query };
    const receivedHash = data.hash;
    delete data.hash;

    // Verify hash
    const calculatedHash = generateHash(data, process.env.PG_SALT);

    if (receivedHash !== calculatedHash) {
      console.error("Hash mismatch in payment success callback");
      return res.status(400).send("Hash mismatch - Payment verification failed");
    }

    const { order_id, transaction_id, response_code } = data;

    // Verify payment status with Payment Gateway (Mandatory)
    let statusResponse;
    try {
      statusResponse = await verifyPaymentStatus(order_id);
    } catch (error) {
      console.error("Payment status verification failed:", error);
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=verification_failed`);
    }

    // Check if payment is successful based on response_code or status
    const isSuccess = response_code === "0" || 
                     response_code === "00" || 
                     statusResponse?.status === "success" ||
                     statusResponse?.response_code === "0";

    if (!isSuccess) {
      // Payment failed
      await updateOrderPaymentStatus(order_id, {
        status: "failed",
        transactionId: transaction_id,
        gatewayResponse: data,
        statusResponse: statusResponse,
        verifiedAt: new Date()
      });

      return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?orderId=${order_id}`);
    }

    // Payment successful - Update order
    await updateOrderPaymentStatus(order_id, {
      status: "paid",
      transactionId: transaction_id,
      gatewayResponse: data,
      statusResponse: statusResponse,
      verifiedAt: new Date()
    });

    res.redirect(`${process.env.FRONTEND_URL}/payment-success?orderId=${order_id}`);

  } catch (error) {
    console.error("Payment Success Callback Error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=server_error`);
  }
};

/**
 * Payment Failure Callback
 * POST /api/payment/failure or GET /api/payment/failure
 * Handles both POST (form data) and GET (query params) from payment gateway
 */
export const paymentFailure = async (req, res) => {
  try {
    // Handle both POST (body) and GET (query) parameters
    const data = { ...req.body, ...req.query };
    const receivedHash = data.hash;
    delete data.hash;

    // Verify hash
    const calculatedHash = generateHash(data, process.env.PG_SALT);

    if (receivedHash !== calculatedHash) {
      console.error("Hash mismatch in payment failure callback");
      return res.status(400).send("Hash mismatch - Payment verification failed");
    }

    const { order_id, transaction_id, response_code, error_message } = data;

    // Update order status
    await updateOrderPaymentStatus(order_id, {
      status: "failed",
      transactionId: transaction_id,
      gatewayResponse: data,
      errorMessage: error_message,
      verifiedAt: new Date()
    });

    res.redirect(`${process.env.FRONTEND_URL}/payment-failure?orderId=${order_id}`);

  } catch (error) {
    console.error("Payment Failure Callback Error:", error);
    res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=server_error`);
  }
};

/**
 * Helper function to update order payment status
 */
async function updateOrderPaymentStatus(orderId, paymentData) {
  try {
    // orderId from gateway might be "ORD_<mongoId>" or just the mongoId
    let order;
    if (orderId.startsWith('ORD_')) {
      const mongoId = orderId.replace('ORD_', '');
      order = await Order.findById(mongoId);
    } else {
      order = await Order.findOne({ 
        $or: [
          { _id: orderId },
          { 'paymentDetails.gatewayOrderId': orderId },
          { 'paymentDetails.transactionId': orderId }
        ]
      });
    }

    if (!order) {
      console.error(`Order not found: ${orderId}`);
      return;
    }

    order.paymentDetails = {
      ...order.paymentDetails,
      ...paymentData,
      paymentMethod: paymentData.paymentMethod || 'online',
      gatewayTransactionId: paymentData.transactionId,
      gatewayResponse: paymentData.gatewayResponse,
      statusResponse: paymentData.statusResponse,
      verifiedAt: paymentData.verifiedAt
    };

    // Update order status based on payment status
    if (paymentData.status === "paid") {
      order.status = "processing";
      // Clear cart after successful payment
      const cart = await Cart.findOne({ userId: order.userId });
      if (cart) {
        cart.items = [];
        await cart.save();
      }
    } else if (paymentData.status === "failed") {
      order.status = "pending";
    }

    await order.save();
    console.log(`Order ${orderId} payment status updated to ${paymentData.status}`);
  } catch (error) {
    console.error("Error updating order payment status:", error);
    throw error;
  }
}

