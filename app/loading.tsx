import React from 'react';
import Container from '@/components/Container';

export default function Loading() {
  return (
    <Container>
      {/* HeaderBg Skeleton */}
      <div className="relative w-full max-w-full mx-auto h-[25vh] sm:h-[35vh] bg-slate-200 animate-pulse rounded-b-2xl" />

      <div className="flex flex-col md:flex-row md:items-start justify-between px-3 md:pr-8">
        {/* HeadLine Skeleton */}
        <div className="flex flex-col items-start justify-center max-w-3xl mx-auto md:mx-0 pb-10 ml-2 relative z-10 w-full animate-pulse">
          {/* Logo Skeleton */}
          <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] relative mb-4 -mt-12 sm:-mt-16 border-[4px] border-white rounded-full bg-slate-300 shadow-sm shrink-0" />

          {/* Title Skeleton */}
          <div className="h-10 sm:h-12 w-64 bg-slate-200 rounded mb-4" />

          {/* Description Skeleton */}
          <div className="h-4 w-full max-w-md bg-slate-200 rounded mb-2.5" />
          <div className="h-4 w-3/4 max-w-sm bg-slate-200 rounded mb-4" />

          {/* SocialMedia Skeleton */}
          <div className="flex mt-3 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-slate-200" />
            ))}
          </div>
        </div>

        {/* SearchBar Skeleton */}
        <div className="hidden md:flex mt-6 h-[44px] w-full max-w-[320px] bg-slate-100 rounded-xl animate-pulse" />
      </div>

      {/* ProductMenu Skeleton */}
      <div className="w-full flex flex-col pt-4">
        {/* Category Links Skeleton */}
        <div className="flex flex-wrap w-full items-center px-8 gap-5 md:gap-7 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
          ))}
        </div>

        {/* ProductCard Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3 place-items-center sm:place-items-stretch">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col gap-3 font-sans w-full mx-4 max-w-[260px] animate-pulse">
              {/* Image Skeleton */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200" />
              
              {/* Product Details Skeleton */}
              <div className="flex flex-col px-0.5">
                <div className="h-[18px] w-3/4 bg-slate-200 rounded mb-2.5 mt-1" />
                <div className="h-[18px] w-1/2 bg-slate-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
