import Image from 'next/image';
import React from 'react';
import Title from './ui/text';
import SocialMedia from './SocialMedia';

const HeadLine = () => {
  return (
    <div className="flex flex-col items-start justify-center text-center max-w-3xl mx-auto py-12 px-1 ml-3">
      <div className="w-28 h-28 relative mb-6">
        <Image
          src="/Logo.png"
          alt="Daniels Place Logo"
          fill
          className="object-cover rounded-full"
          priority
        />
      </div>

      <Title className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
        Daniels Place
      </Title>

      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl text-left">
        Discover a variety of products tailored to your needs. Shop digital goods, exclusive services, and more. Seamless browsing and secure checkout guaranteed.
      </p>
      <SocialMedia className='mt-3'/>
    </div>
  );
};

export default HeadLine;