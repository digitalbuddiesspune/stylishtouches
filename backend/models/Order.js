import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered", "cancel"],
      default: "pending",
    },
    shippingAddress: {
      name: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      phone: String,
    },
    paymentDetails: {
      // Razorpay fields (legacy)
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
      // Payment Gateway fields
      paymentMethod: String,
      status: String, // paid, failed, pending
      transactionId: String,
      gatewayTransactionId: String,
      gatewayResponse: mongoose.Schema.Types.Mixed, // Raw gateway callback response
      statusResponse: mongoose.Schema.Types.Mixed, // Payment status API response
      errorMessage: String,
      verifiedAt: Date,
      upi: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
