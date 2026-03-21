import React from 'react'
import Image from 'next/image'
import Container from './Container';

const HeaderBg = () => {
  return (
    <Image src="/headerbg.png" alt="Header Background" fill className="object-cover object-center -z-10 max-h-[35vh] absolute w-fit" />



  )
}

export default HeaderBg;