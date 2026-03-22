import React from 'react'
import Image from 'next/image'
import Container from './Container';

interface Props {
  imageUrl?: string;
}

const HeaderBg = ({ imageUrl = "/headerbg.png" }: Props) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto h-[25vh] sm:h-[35vh]">
      <Image 
        src={imageUrl} 
        alt="Header Background" 
        fill 
        priority
        className="object-cover object-center -z-10 absolute w-full rounded-b-2xl" 
      />
    </div>
  )
}

export default HeaderBg;