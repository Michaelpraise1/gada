"use client";
import React from 'react'
import Container from './Container'
import Logo from './Logo'
import CurrencyIcon from './CurrencyIcon'
import CartIcon from './CartIcon'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname();
  // Ensure we identify all primary marketing pages that use the Hero / HeaderBg layout for a consistent transparent UI
  const isHome = pathname === '/' || pathname === '/product/Physical' || pathname === '/product/Digital';

  return (
    <header className={`${isHome ? 'absolute top-0 left-0 w-full z-50 bg-transparent' : 'w-full bg-white relative'} py-3`}>
      <Container className='flex items-center justify-between  bg-white/5 backdrop-blur-sm border border-white/2 py-4 px-3 relative fixed top-0 left-0 z-50 w-full'>
        <Logo />
        <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
          <CurrencyIcon />
          <CartIcon />
        </div>
      </Container>
    </header>
  )
}

export default Header