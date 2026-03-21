import Link from 'next/link'
import React from 'react'
import Image from 'next/image'


const Logo = () => {
  return (
    <Link href="/">
      <Image src="/Logo.png" alt="Gada Logo" height={35} width={120} className="h-10 w-auto" />
    </Link>
  )
}

export default Logo;