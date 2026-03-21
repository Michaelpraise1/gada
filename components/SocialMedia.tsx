"use client"

import { Facebook, Instagram, MessageCircle, Twitter, Youtube } from 'lucide-react';
import React from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}


const socialLink = [
  {
    title: "Facebook",
    href: "https://www.youtube.com/michael",
    icon: <Facebook className='w-5 h-5' />,
  },
  {
    title: "Twitter",
    href: "https://www.youtube.com/michael",
    icon: <Twitter className='w-5 h-5' />,
  },

  {
    title: "Instagram",
    href: "https://www.youtube.com/michael",
    icon: <Instagram className='w-5 h-5' />,
  },
  {
    title: "whatsapp",
    href: "https://www.youtube.com/michael",
    icon: <MessageCircle className='w-5 h-5' />,
  },

];


const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-4", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger 
              onClick={() => window.open(item?.href, '_blank', 'noopener,noreferrer')}
              className={cn("flex p-2 border rounded-full text-white bg-primary-bg transition-all hover:opacity-80", iconClassName)}>
              {item?.icon}
            </TooltipTrigger>
            {/* <TooltipContent className={cn("bg-white text-daarkColor font-semibold border border-[shop_light_red]  p-2", tooltipClassName)}>
              {item?.title}
            </TooltipContent> */}
          </Tooltip>
        ))}
      </div>

    </TooltipProvider>
  )
}

export default SocialMedia; 