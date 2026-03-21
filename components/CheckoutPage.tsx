"use client";
import React, { useState } from 'react';
import { ArrowLeft, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';

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
  
  // Standard fixed fee percentage
  const fee = cartTotal * 0.01;
  const grandTotal = cartTotal + fee;

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans w-full max-w-md mx-auto relative">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button 
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-800" strokeWidth={1.5} />
        </button>
        <h1 className="text-[16px] font-bold text-gray-900">
          Checkout
        </h1>
        <button 
          onClick={() => router.push('/')}
          className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4 text-gray-800" strokeWidth={1.5} />
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col px-6 py-2 gap-5 flex-1 overflow-y-auto">
        
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-semibold text-gray-600">Full name</label>
          <input 
            type="text" 
            placeholder="Full name" 
            className="w-full border border-gray-100 rounded-[10px] px-4 py-3 outline-none focus:border-[#754DEB] transition-colors text-[13.5px] placeholder:text-gray-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-semibold text-gray-600">Email</label>
          <input 
            type="email" 
            placeholder="Email" 
             className="w-full border border-gray-100 rounded-[10px] px-4 py-3 outline-none focus:border-[#754DEB] transition-colors text-[13.5px] placeholder:text-gray-400"
          />
        </div>

        {/* Phone number */}
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-semibold text-gray-600">Phone number</label>
          <div className="flex items-center w-full border border-gray-100 rounded-[10px] px-3.5 py-2.5 focus-within:border-[#754DEB] transition-colors relative">
            
            {/* Native Select Overlay Trick for Perfect Mobile UX */}
            <div className="relative flex items-center pr-2 border-r border-gray-200 mr-2.5 shrink-0">
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
              
              {/* Real UI seen by the user */}
              <span className="text-[17px] mr-1.5">{selectedCountry.flag}</span>
              <span className="text-gray-800 text-[13px] font-medium">{selectedCountry.dialCode}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
            </div>

            <input 
              type="tel" 
              className="w-full outline-none text-[13.5px] bg-transparent font-medium text-gray-800"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>
      </div>

      {/* Bottom Fixed Area */}
      <div className="mt-auto px-6 py-6 border-t border-gray-50 flex flex-col gap-5 pb-8">
        
        {/* Totals Box */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-[13px] text-gray-600 font-medium">
            <span>Subtotal</span>
            <span className="text-gray-900">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-between text-[13px] text-gray-600 font-medium">
            <span>Fee</span>
            <span className="text-gray-900">{formatPrice(fee)}</span>
          </div>
          <div className="flex items-center justify-between text-[15px] font-bold text-gray-900 mt-1">
            <span>Total</span>
            <span className="font-extrabold tracking-tight">{formatPrice(grandTotal)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-1">
          <button 
            onClick={() => router.back()}
            className="flex-1 py-3.5 bg-[#F2F3F8] hover:bg-[#E5E7EB] text-gray-800 rounded-[12px] text-[14px] font-semibold transition-colors">
            Back
          </button>
          <button 
            className="flex-[1.5] py-3.5 bg-[#754DEB] hover:bg-[#623bc9] text-white rounded-[12px] text-[14px] font-semibold transition-colors shadow-sm">
            Pay with card
          </button>
        </div>
        
      </div>

    </div>
  );
}
