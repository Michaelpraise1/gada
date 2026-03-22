"use client"

import { Facebook, Instagram, MessageCircle, Twitter, Youtube } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { cn } from '@/lib/utils';
import { getSocialsAction } from '@/actions/getSocials';

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  const [dbSocials, setDbSocials] = useState<any>(null);

  useEffect(() => {
    async function loadSocials() {
      const data = await getSocialsAction();
      if (data) {
        setDbSocials(data);
      }
    }
    loadSocials();
  }, []);


  const dynamicLinks = [
    {
      title: "Facebook",
      href: dbSocials?.facebook || "https://facebook.com",
      icon: <Facebook className='w-5 h-5' />,
    },
    {
      title: "Twitter",
      href: dbSocials?.twitter || "https://twitter.com",
      icon: <Twitter className='w-5 h-5' />,
    },
    {
      title: "Instagram",
      href: dbSocials?.instagram || "https://instagram.com",
      icon: <Instagram className='w-5 h-5' />,
    },
    {
      title: "WhatsApp",
      href: dbSocials?.whatsapp || "https://whatsapp.com",
      icon: <MessageCircle className='w-5 h-5' />,
    },
  ];

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-4", className)}>
        {dynamicLinks.map((item) => (
          <Tooltip key={item.title}>
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