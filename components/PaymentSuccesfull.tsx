"use client";
import React from 'react';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PaymentSuccesfullProps {
  onClose: () => void;
}

export default function PaymentSuccesfull({ onClose }: PaymentSuccesfullProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-sans w-full max-w-md mx-auto p-6 text-center animate-in fade-in duration-500">

      {/* Success Animation Container */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-green-100 rounded-full scale-[2.5] opacity-20 animate-ping duration-1000"></div>
        <div className="relative bg-green-50 rounded-full p-6">
          <CheckCircle className="w-16 h-16 text-green-500" strokeWidth={1.5} />
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-[26px] font-extrabold text-gray-900 mb-2 tracking-tight">
        Payment Successful!
      </h1>
      <p className="text-gray-500 text-[15px] font-medium leading-relaxed px-6 mb-12">
        Thank you for your purchase. Your order has been placed and is being processed.
      </p>

      {/* Order Details Placeholder */}
      <div className="w-full bg-gray-50 rounded-[24px] p-6 mb-12 flex flex-col gap-4 border border-gray-100/50">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[13px] font-semibold uppercase tracking-wider">Transaction ID</span>
          <span className="text-gray-900 text-[14px] font-bold">#GADA-9382-XP</span>
        </div>
        <div className="h-[1px] bg-gray-100 w-full" />
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[13px] font-semibold uppercase tracking-wider">Status</span>
          <div className="flex items-center gap-1.5 bg-green-500/10 text-green-600 px-3 py-1 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[12px] font-bold">Completed</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-3 mt-auto">
        <button
          onClick={onClose}
          className="w-full py-4.5 bg-[#7444FA] hover:bg-[#6339d6] text-white rounded-[20px] text-[16px] font-bold transition-all shadow-xl shadow-purple-100 flex items-center justify-center gap-2 active:scale-[0.98]">
          Back to Shop
          <ShoppingBag className="w-5 h-5" />
        </button>

        <button
          onClick={() => router.push('/orders')}
          className="w-full py-4.5 bg-white border border-gray-100 text-gray-800 rounded-[20px] text-[15px] font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
          View My Orders
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10 opacity-60" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 opacity-60" />

    </div>
  );
}
