"use client";
import React from 'react'
import Container from './Container'
import Logo from './Logo'
import CurrencyIcon from './CurrencyIcon'
import CartIcon from './CartIcon'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className={`${isHome ? 'absolute top-0 left-0 w-full z-50 bg-transparent' : 'w-full bg-white relative'} py-3`}>
      <Container className='flex items-center justify-between bg-transparent py-4 px-3 relative'>
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