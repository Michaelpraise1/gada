"use client";
import React, { useState } from 'react';
import { ArrowLeft, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import PayWithCard from './PayWithCard';


const countries = [
  { name: 'Nigeria', flag: '🇳🇬', code: 'NG' },
  { name: 'United States', flag: '🇺🇸', code: 'US' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB' },
  { name: 'Canada', flag: '🇨🇦', code: 'CA' },
];

const regions = [
  { name: 'Lagos Mainland', fee: 2 },
  { name: 'Lagos Island', fee: 3 },
  { name: 'Abuja Central', fee: 5 },
  { name: 'Port Harcourt', fee: 4 },
];

interface DeliveryAddressProps {
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
}

export default function DeliveryAddress({ onBack, onNext, onClose }: DeliveryAddressProps) {
  const { cartTotal, formatPrice } = useCart();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);

  // Pricing Logic
  const subtotal = cartTotal;
  const fee = cartTotal * 0.01; // 1% Processing Fee
  const total = subtotal + fee; // Regional fee can be added here if needed

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
          Checkout
        </h1>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
          <X className="w-5 h-5 text-gray-800" strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide">
        <div className="flex flex-col gap-5 pt-2">

          {/* Delivery Address */}
          <div className="flex flex-col gap-2">
            <label className="text-[12.5px] font-semibold text-gray-600">Delivery address</label>
            <input
              type="text"
              placeholder="Ogo-Oluwa"
              className="w-full border border-gray-100 rounded-[12px] px-4 py-3.5 outline-none focus:border-[#754DEB] transition-colors text-[14.5px] placeholder:text-gray-300 font-medium text-gray-800"
            />
          </div>

          {/* City & State/LGA Row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Ikeja"
                className="w-full border border-gray-100 rounded-[12px] px-4 py-3.5 outline-none focus:border-[#754DEB] transition-colors text-[14.5px] placeholder:text-gray-300 font-medium text-gray-800"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Lagos"
                className="w-full border border-gray-100 rounded-[12px] px-4 py-3.5 outline-none focus:border-[#754DEB] transition-colors text-[14.5px] placeholder:text-gray-300 font-medium text-gray-800"
              />
            </div>
          </div>

          {/* Country Selection */}
          <div className="relative group">
            <div className="w-full border border-gray-100 rounded-[12px] px-4 py-3.5 flex items-center justify-between cursor-pointer group-hover:border-gray-200 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[20px] leading-none">{selectedCountry.flag}</span>
                <span className="text-[14px] text-gray-800 font-medium">{selectedCountry.name}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <select
              title="Select Country"
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
              value={selectedCountry.code}
              onChange={(e) => {
                const c = countries.find(x => x.code === e.target.value);
                if (c) setSelectedCountry(c);
              }}
            >
              {countries.map(c => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Delivery Note */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-[12.5px] font-semibold text-gray-600">Delivery note</label>
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full border border-gray-100 rounded-[12px] px-4 py-3.5 outline-none focus:border-[#754DEB] transition-colors text-[14.5px] placeholder:text-gray-300 font-medium text-gray-800"
            />
          </div>

          {/* Delivery Region Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-[12.5px] font-semibold text-gray-600">Delivery region</label>
            <div className="relative group">
              <div className="w-full border border-gray-100 rounded-[12px] px-4 py-3.5 flex items-center justify-between cursor-pointer group-hover:border-gray-200 transition-colors bg-white">
                <span className="text-[14px] text-gray-800 font-medium">{selectedRegion.name} - ${selectedRegion.fee}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <select
                title="Select Delivery Region"
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                value={selectedRegion.name}
                onChange={(e) => {
                  const r = regions.find(x => x.name === e.target.value);
                  if (r) setSelectedRegion(r);
                }}
              >
                {regions.map(r => (
                  <option key={r.name} value={r.name}>{r.name} - ${r.fee}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Summary Breakdown */}
          <div className="mt-6 pt-6 border-t border-gray-50 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-gray-500 font-medium">Subtotal</span>
              <span className="text-[14px] text-gray-900 font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-gray-500 font-medium">Fee</span>
              <span className="text-[14px] text-gray-900 font-bold">{formatPrice(fee)}</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[16px] text-gray-900 font-bold">Total</span>
              <span className="text-[22px] text-gray-900 font-extrabold tracking-tight">{formatPrice(total + selectedRegion.fee)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Call to Action Footer */}
      <div className="absolute bottom-0 w-full bg-white p-6 border-t border-gray-50 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 bg-[#F2F3F8] hover:bg-gray-200 text-gray-800 rounded-[14px] text-[15px] font-bold transition-all active:scale-[0.98]">
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-[1.5] py-4 bg-[#7444FA] hover:bg-[#6339d6] text-white rounded-[14px] text-[15px] font-bold transition-all shadow-lg active:scale-[0.98]">
          Pay now
        </button>
      </div>

    </div>
  );
}