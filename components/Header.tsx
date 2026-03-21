import React from 'react'
import Container from './Container'
import Logo from './Logo'
import CurrencyIcon from './CurrencyIcon'
import CartIcon from './CartIcon'
import HeaderBg from './HeaderBg'



const Header = () => {
  return (
    <header className='py-5 px-3'>
      <Container className='flex items-center justify-between py-4 px-3 relative '>
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