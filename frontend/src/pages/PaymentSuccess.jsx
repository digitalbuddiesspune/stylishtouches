import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import api from '../api/axios';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to orders page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/orders');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full p-4 bg-green-100 dark:bg-green-900/30">
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Payment Successful!
        </h1>

        <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
          Thank you for your purchase
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
            <Package className="w-12 h-12" style={{ color: 'var(--accent-yellow)' }} />
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Your order has been confirmed and will be processed shortly. You will receive an email confirmation shortly.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/orders')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <span>View My Orders</span>
            <ArrowRight className="w-5 h-5" />
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

        <p className="text-xs mt-6" style={{ color: 'var(--text-secondary)' }}>
          Redirecting to orders page in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;

