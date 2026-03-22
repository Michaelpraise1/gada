import Image from 'next/image';
import React from 'react';
import Title from './ui/text';
import SocialMedia from './SocialMedia';

interface Props {
  title?: string;
  description?: string;
  logoUrl?: string;
}

const HeadLine = ({ 
  title = "Daniels Place", 
  description = "Discover a variety of products tailored to your needs. Shop digital goods, exclusive services, and more. Seamless browsing and secure checkout guaranteed.",
  logoUrl = "/Logo.png"
}: Props) => {
  return (
    <div className="flex flex-col items-start justify-center max-w-3xl mx-auto pb-10 px-1 ml-2 relative z-10">
      <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] relative mb-4 -mt-12 sm:-mt-16 border-[4px] border-white rounded-full bg-white shadow-sm shrink-0">
        <Image
          src={logoUrl}
          alt={title}
          fill
          className="object-cover rounded-full"
          priority
        />
      </div>

      <Title className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground text-left">
        {title}
      </Title>

      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl text-left">
        {description}
      </p>
      <SocialMedia className='mt-3'/>
    </div>
  );
};

export default HeadLine;