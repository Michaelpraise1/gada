import React from 'react'
import Container from './Container'

const Footer = () => {
  return (
    <footer>
      <Container>
       <div className='py-6 border-t text-center text-sm text-gray-600 flex flex-col align-center'>
        <p className='text-sm'>
          © {new Date().getFullYear()}{" "}daniels place store. All rights reserved.
        </p>
      </div>
      </Container>
    </footer>
  )
}

export default Footer