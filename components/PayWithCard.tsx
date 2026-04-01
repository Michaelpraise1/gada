"use client";
import React, { useState } from 'react';
import { ArrowLeft, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/components/CartContext';

interface PayWithCardProps {
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
}

const countries = [
  { name: 'United States of America', flag: '🇺🇸', code: 'US' },
  { name: 'Nigeria', flag: '🇳🇬', code: 'NG' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB' },
  { name: 'Canada', flag: '🇨🇦', code: 'CA' },
];

export default function PayWithCard({ onBack, onNext, onClose }: PayWithCardProps) {
  const { cartTotal, formatPrice } = useCart();
  const [discountCode, setDiscountCode] = useState<string | null>("DIS78Y (10% OFF)");

  // Pricing Logic
  const subtotal = cartTotal;
  const fee = cartTotal * 0.01; 
  const discountAmount = discountCode ? subtotal * 0.10 : 0;
  const total = subtotal + fee - discountAmount;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans w-full max-w-md mx-auto relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">
          Payment
        </h1>
        <button 
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
          <X className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-20 scrollbar-hide">
        <div className="flex flex-col gap-6 pt-4">
          
          {/* Card Number */}
          <div className="flex flex-col gap-2">
            <label className="text-[12.5px] font-semibold text-gray-600">Card number</label>
            <input 
              type="text" 
              placeholder="4242 4242 4242 4242"
              className="w-full border border-gray-100 rounded-[12px] px-4 py-4 outline-none focus:border-[#754DEB] transition-colors text-[16px] tracking-wider placeholder:text-gray-200 bg-gray-50/30"
            />
          </div>

          {/* Expiry & CVV Row */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[12.5px] font-semibold text-gray-600">Expiration date</label>
              <input 
                type="text" 
                placeholder="MM/YY"
                className="w-full border border-gray-100 rounded-[12px] px-4 py-4 outline-none focus:border-[#754DEB] transition-colors text-[16px] placeholder:text-gray-200 bg-gray-50/30"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[12.5px] font-semibold text-gray-600">Security code</label>
              <input 
                type="text" 
                placeholder="CVV"
                className="w-full border border-gray-100 rounded-[12px] px-4 py-4 outline-none focus:border-[#754DEB] transition-colors text-[16px] placeholder:text-gray-200 bg-gray-50/30"
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[12.5px] font-semibold text-gray-600">Cardholder name</label>
            <input 
              type="text" 
              placeholder="Your full name"
              className="w-full border border-gray-100 rounded-[12px] px-4 py-4 outline-none focus:border-[#754DEB] transition-colors text-[16px] placeholder:text-gray-200 bg-gray-50/30"
            />
          </div>

          {/* Price Summary Breakdown */}
          <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col gap-4">
            <div className="flex items-center justify-between text-gray-500 font-medium">
              <span className="text-[14px]">Subtotal</span>
              <span className="text-[15px] text-gray-900 font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-gray-500 font-medium">
              <span className="text-[14px]">Fee</span>
              <span className="text-[15px] text-gray-900 font-bold">{formatPrice(fee)}</span>
            </div>
            {discountCode && (
              <div className="flex items-center justify-between text-green-600 font-medium">
                <span className="text-[14px]">Discount</span>
                <span className="text-[15px] font-bold">-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-4">
              <span className="text-[17px] text-gray-900 font-bold">Total</span>
              <span className="text-[26px] text-gray-900 font-extrabold tracking-tight">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Call to Action Footer */}
      <div className="absolute bottom-0 w-full bg-white p-6 border-t border-gray-50 flex gap-4">
        <button 
          onClick={onBack}
          className="flex-1 py-4.5 bg-[#F2F3F8] hover:bg-gray-200 text-gray-800 rounded-[16px] text-[15px] font-bold transition-all active:scale-[0.98]">
          Back
        </button>
        <button 
          onClick={onNext}
          className="flex-[1.8] py-4.5 bg-[#7444FA] hover:bg-[#6339d6] text-white rounded-[16px] text-[15px] font-bold transition-all shadow-xl shadow-purple-100 active:scale-[0.98]">
          Pay now
        </button>
      </div>

    </div>
  );
}
