# Payment Gateway Integration Setup Guide

This document provides instructions for setting up the payment gateway integration in your MERN stack application.

## 📋 Prerequisites

- Payment Gateway account and credentials (API Key, Salt, etc.)
- Backend server running on Node.js/Express
- Frontend React application
- MongoDB database

## 🔧 Backend Setup

### 1. Environment Variables

Add the following variables to your `backend/.env` file:

```env
# Payment Gateway Configuration
PG_API_URL=https://<gateway-base-url>
PG_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PG_SALT=xxxxxxxxxxxxxxxx
PG_ENCRYPTION_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
PG_DECRYPTION_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
PG_MODE=UAT
# PG_MODE=LIVE (for production)

# Server URLs
BACKEND_URL=http://localhost:4000
FRONTEND_URL=http://localhost:5173
```

**Important Notes:**
- Use `UAT` mode for testing
- Switch to `LIVE` mode only after thorough testing
- Never commit actual credentials to version control
- Get these credentials from your payment gateway provider after onboarding

### 2. Install Dependencies

The payment gateway integration requires `axios` for HTTP requests. Install it if not already present:

```bash
cd backend
npm install axios
```

### 3. Backend Files Created

The following files have been created/updated:

- `backend/utils/generateHash.js` - Hash generation utility
- `backend/controllers/paymentController.js` - Payment controller with all endpoints
- `backend/routes/paymentRoutes.js` - Updated with payment gateway routes
- `backend/models/Order.js` - Updated to support payment gateway fields

### 4. API Endpoints

#### Create Payment Request
```
POST /api/payment/create
Authorization: Bearer <token>
Body: {
  amount: number,
  name: string,
  email: string,
  phone: string,
  shippingAddress: {
    name: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phone: string
  }
}
```

#### Payment Callbacks (Called by Payment Gateway)
```
POST/GET /api/payment/success
POST/GET /api/payment/failure
```

## 🎨 Frontend Setup

### 1. Frontend Files Created/Updated

- `frontend/src/pages/Checkout.jsx` - Updated with payment method selection
- `frontend/src/pages/PaymentSuccess.jsx` - Payment success page
- `frontend/src/pages/PaymentFailure.jsx` - Payment failure page
- `frontend/src/router/Router.jsx` - Updated with payment routes

### 2. Routes Added

- `/payment-success` - Payment success page
- `/payment-failure` - Payment failure page

## 🔄 Payment Flow

1. **User clicks "Pay Now"** on checkout page
2. **Frontend calls** `/api/payment/create` with order details
3. **Backend:**
   - Creates order in database
   - Builds payment payload
   - Generates hash using SALT
   - Calls Payment Gateway API
4. **User is redirected** to Payment Gateway page
5. **After payment**, gateway POSTs response to `return_url`
6. **Backend:**
   - Verifies hash
   - Calls Payment Status API (mandatory)
   - Updates order status (PAID/FAILED)
7. **Backend redirects** user to frontend success/failure page

## 🔐 Security Features

✅ **Hash Verification** - All callbacks verify hash before processing
✅ **Payment Status API** - Mandatory verification call to prevent tampering
✅ **Backend-only Operations** - All sensitive operations (hash, API keys) done on backend
✅ **Order Creation** - Order created before payment to track transactions

## 🧪 Testing

### Test with UAT Credentials

1. Set `PG_MODE=UAT` in `.env`
2. Use UAT credentials provided by payment gateway
3. Test complete payment flow:
   - Create payment request
   - Complete payment on gateway
   - Verify callback handling
   - Check order status update

### Test Scenarios

- ✅ Successful payment
- ✅ Failed payment
- ✅ Payment cancellation
- ✅ Hash verification failure
- ✅ Network errors

## 📝 Important Notes

1. **Always verify payment status** using Payment Status API before marking order as paid
2. **Never trust frontend** - All verification must happen on backend
3. **Save raw gateway response** for debugging and audit trails
4. **Handle both GET and POST** callbacks as gateways may use either
5. **Whitelist server IP** for Payment Status API if required by gateway

## 🚀 Production Checklist

- [ ] Switch `PG_MODE` to `LIVE`
- [ ] Update all credentials to production values
- [ ] Update `BACKEND_URL` and `FRONTEND_URL` to production domains
- [ ] Test end-to-end payment flow in production
- [ ] Set up monitoring and error alerts
- [ ] Configure webhooks (if available) for settlement updates
- [ ] Review and test refund process (if applicable)

## 🆘 Troubleshooting

### Payment Gateway Not Redirecting
- Check `PG_API_URL` is correct
- Verify API credentials
- Check network connectivity
- Review gateway response in logs

### Hash Mismatch Errors
- Verify `PG_SALT` is correct
- Check hash generation logic matches gateway requirements
- Ensure payload keys are sorted alphabetically

### Order Not Updating
- Check database connection
- Verify order ID format matches
- Review payment status API response
- Check server logs for errors

## 📚 Additional Resources

- Payment Gateway API Documentation
- Hash Generation Algorithm Documentation
- Payment Status API Reference

---

**Need Help?** Contact your payment gateway support or review the integration guide provided by your gateway provider.

