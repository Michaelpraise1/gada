"use client";
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useCart } from './CartContext';

const CartIcon = () => {
  const { cartCount } = useCart();

  return (
    <Link href={"/cart"} className=' group relative flex items-center gap-1 rounded-md border-2 bg-gray-200 px-3 py-2'>
      <ShoppingCart className='w-5 h-5 ' />
      Cart
      {cartCount > 0 && (
        <span className='bg-primary-bg text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
          {cartCount}
        </span>
      )}
    </Link>
  )
}

export default CartIcon;