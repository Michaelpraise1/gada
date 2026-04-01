"use client";
import React, { useState } from 'react';
import { ArrowLeft, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import DeliveryAddress from './DeliveryAddress';
import PayWithCard from './PayWithCard';
import PaymentSuccesfull from './PaymentSuccesfull';

const countryCodes = [
  { code: 'NG', dialCode: '+234', flag: '🇳🇬' },
  { code: 'US', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', dialCode: '+1', flag: '🇨🇦' },
  { code: 'GH', dialCode: '+233', flag: '🇬🇭' },
  { code: 'KE', dialCode: '+254', flag: '🇰🇪' },
  { code: 'AE', dialCode: '+971', flag: '🇦🇪' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartTotal, formatPrice } = useCart();
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [step, setStep] = useState(1); // 1: Info, 2: Payment

  // Standard fixed fee percentage
  const fee = cartTotal * 0.01;
  const grandTotal = cartTotal + fee;

  if (step === 2) {
    return (
      <DeliveryAddress
        onBack={() => setStep(1)}
        onNext={() => setStep(3)}
        onClose={() => router.push('/')}
      />
    );
  }

  if (step === 3) {
    return (
      <PayWithCard
        onBack={() => setStep(2)}
        onNext={() => setStep(4)}
        onClose={() => router.push('/')}
      />
    );
  }

  if (step === 4) {
    return (
      <PaymentSuccesfull
        onClose={() => router.push('/')}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans w-full max-w-md mx-auto relative overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">
          Checkout
        </h1>
        <button
          onClick={() => router.push('/')}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
          <X className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col px-6 py-2 gap-6 flex-1 overflow-y-auto scrollbar-hide">

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[12.5px] font-semibold text-gray-600">Full name</label>
          <input
            type="text"
            placeholder="Full name"
            className="w-full border border-gray-100 rounded-[12px] px-4 py-3.5 outline-none focus:border-[#754DEB] transition-colors text-[14px] placeholder:text-gray-300 font-medium text-gray-800"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-[12.5px] font-semibold text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-100 rounded-[12px] px-4 py-3.5 outline-none focus:border-[#754DEB] transition-colors text-[14px] placeholder:text-gray-300 font-medium text-gray-800"
          />
        </div>

        {/* Phone number */}
        <div className="flex flex-col gap-2">
          <label className="text-[12.5px] font-semibold text-gray-600">Phone number</label>
          <div className="flex items-center w-full border border-gray-100 rounded-[12px] px-4 py-3 focus-within:border-[#754DEB] transition-colors relative">

            <div className="relative flex items-center pr-3 border-r border-gray-100 mr-3 shrink-0">
              <select
                title="Country Code"
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const c = countryCodes.find(x => x.code === e.target.value);
                  if (c) setSelectedCountry(c);
                }}
                value={selectedCountry.code}
              >
                {countryCodes.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code} ({c.dialCode})</option>
                ))}
              </select>

              <span className="text-[18px] mr-2 leading-none">{selectedCountry.flag}</span>
              <span className="text-gray-800 text-[14px] font-bold">{selectedCountry.dialCode}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1.5" />
            </div>

            <input
              type="tel"
              className="w-full outline-none text-[14px] bg-transparent font-medium text-gray-800 placeholder:text-gray-300"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>
      </div>

      {/* Bottom Fixed Area */}
      <div className="mt-auto px-6 py-6 border-t border-gray-50 flex flex-col gap-6 bg-white shrink-0">

        {/* Totals Box */}
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between text-[14px] text-gray-500 font-medium">
            <span>Subtotal</span>
            <span className="text-gray-900 font-bold">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-between text-[14px] text-gray-500 font-medium">
            <span>Fee</span>
            <span className="text-gray-900 font-bold">{formatPrice(fee)}</span>
          </div>
          <div className="flex items-center justify-between text-[17px] font-bold text-gray-900 mt-2">
            <span>Total</span>
            <span className="text-[20px] font-extrabold tracking-tight">{formatPrice(grandTotal)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 py-4 bg-[#F2F3F8] hover:bg-gray-200 text-gray-800 rounded-[14px] text-[15px] font-bold transition-all active:scale-[0.98]">
            Back
          </button>
          <button
            onClick={() => setStep(2)}
            className="flex-[1.5] py-4 bg-[#754DEB] hover:bg-[#623bc9] text-white rounded-[14px] text-[15px] font-bold transition-all shadow-lg active:scale-[0.98]">
            Next
          </button>
        </div>

      </div>

    </div>
  );
}
