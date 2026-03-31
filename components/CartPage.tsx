"use client"
import React from 'react';
import Image from 'next/image';
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';
import Container from './Container';

export default function CartPage() {
  const { items, updateQuantity, removeItem, cartTotal, cartCount, formatPrice } = useCart();
  const router = useRouter();



  return (
    <Container className='lg:w-1/2 w-fulloverflow-hidden flex flex-col items-right'>
      {/* // <div className="flex flex-col h-screen w-full bg-white font-sans max-w-md mx-auto relative overflow-hidden"> */}
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h1 className="text-[17px] font-bold flex items-center gap-1.5 text-gray-900">
          My Cart {items.length > 0 && <span>({cartCount})</span>}
        </h1>
        <button
          onClick={() => router.back()}
          className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4 text-gray-600" strokeWidth={2} />
        </button>
      </div>

      {items.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center flex-grow p-6">
          <div className="mb-4">
            <ShoppingCart className="w-10 h-10 text-slate-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-base font-semibold text-gray-800 mb-1">Your cart is empty</h2>
          <p className="text-sm text-gray-500 text-center">
            No product has been added.
          </p>
          {/* Add a button to return when empty since the original Continue Shopping is replaced by checkout logic */}
          <div className="mt-8 w-full">
            <button
              onClick={() => router.push('/')}
              className="w-full py-4 bg-[#754DEB] hover:bg-[#623bc9] text-white rounded-[14px] text-sm font-medium transition-colors">
              Continue shopping
            </button>
          </div>
        </div>
      ) : (
        /* Populated State */
        <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-hide">
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                {/* Product Image */}
                <div className={`relative w-[85px] h-[85px] shrink-0 rounded-[12px] overflow-hidden bg-gradient-to-tr from-gray-200 to-gray-300`}>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Info & Controls */}
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <h3 className="text-[13px] font-medium text-gray-800 leading-snug">
                      {item.name}
                    </h3>
                    <div className="text-[13px] text-gray-500 mt-0.5">
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-[#F5F5F5] rounded-[6px] h-7">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3 stroke-[2]" />
                      </button>
                      <span className="w-6 text-center text-[12px] font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <Plus className="w-3 h-3 stroke-[2]" />
                      </button>
                    </div>

                    {/* Delete Icon */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 flex items-center justify-center bg-[#F5F5F5] text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-[6px] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer / Checkout Area */}
      {items.length > 0 && (
        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[14px] text-gray-600">Subtotal</span>
            <span className="text-[15px] text-gray-900 font-bold">{formatPrice(cartTotal)}</span>
          </div>
          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-4 bg-[#6A42E4] hover:bg-[#5833cc] text-white rounded-[14px] text-[14.5px] font-medium transition-colors shadow-sm">
            Checkout
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full mt-3 py-4 bg-[#754DEB] hover:bg-[#623bc9] text-white rounded-[14px] text-sm font-medium transition-colors">
            Continue shopping
          </button>
        </div>
      )}
    </Container>
  );
}
