import { cn } from '@/lib/utils';
import React from 'react'

const Title = ({ children, className }:
  {
    children: React.ReactNode;
    className?: string
  }) => {
  return (
    <h2 className={cn("text-2xl font-semibold", className)}>
      {children}
    </h2>
  );
};

export default Title;