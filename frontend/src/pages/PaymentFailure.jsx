import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import api from '../api/axios';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const error = searchParams.get('error');

  const getErrorMessage = () => {
    if (error === 'verification_failed') {
      return 'Payment verification failed. Please contact support if the amount was deducted.';
    } else if (error === 'server_error') {
      return 'A server error occurred. Please try again or contact support.';
    }
    return 'Your payment could not be processed. Please try again or use a different payment method.';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full p-4 bg-red-100 dark:bg-red-900/30">
            <XCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Payment Failed
        </h1>

        <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
          {getErrorMessage()}
        </p>

        {orderId && (
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-lg" style={{ 
          backgroundColor: 'var(--bg-secondary)',
          border: '2px solid var(--border-color)'
        }}>
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="w-12 h-12" style={{ color: '#ef4444' }} />
          </div>
          <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <p>Possible reasons for failure:</p>
            <ul className="list-disc list-inside text-left space-y-1">
              <li>Insufficient funds</li>
              <li>Card declined by bank</li>
              <li>Network error</li>
              <li>Payment gateway timeout</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/checkout')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 flex items-center justify-center gap-2"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-secondary)'
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Cart</span>
          </button>

          <button
            onClick={() => navigate('/shop')}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-secondary)'
            }}
          >
            Continue Shopping
          </button>
        </div>

        <div className="mt-6 p-4 rounded-lg text-xs" style={{ 
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-secondary)'
        }}>
          <p>If the amount was deducted from your account, it will be refunded within 5-7 business days.</p>
          <p className="mt-2">For support, contact us at: <span className="font-semibold">support@example.com</span></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;

