import React from 'react';
import Container from '@/components/Container';
import { ArrowLeft } from 'lucide-react';

export default function ProductLoadingSkeleton() {
  return (
    <Container>
      <div className="min-h-screen bg-white font-sans text-gray-900 pb-16 animate-pulse">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

          {/* Back Button Skeleton */}
          <div className="flex items-center text-[15px] font-medium text-gray-400 mb-10 w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={2} />
            Back
          </div>

          {/* Main Content Grid Skeleton */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

            {/* Left Column - Image & Description */}
            <div className="flex-1 flex flex-col gap-10">

              {/* Image Skeleton */}
              <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-slate-200" />

              {/* Description Section Skeleton */}
              <div className="flex flex-col gap-4">
                <div className="h-7 w-32 bg-slate-200 rounded" />
                <div className="h-4 w-full bg-slate-200 rounded" />
                <div className="h-4 w-full bg-slate-200 rounded" />
                <div className="h-4 w-3/4 bg-slate-200 rounded" />
                <div className="h-4 w-5/6 bg-slate-200 rounded" />
              </div>
            </div>

            {/* Right Column - Title & Actions */}
            <div className="w-full lg:w-[420px] flex flex-col">
              {/* Title Skeleton */}
              <div className="h-10 w-full bg-slate-200 rounded mb-2" />
              <div className="h-10 w-2/3 bg-slate-200 rounded mb-4" />

              {/* Share Top Button Skeleton */}
              <div className="mb-8">
                <div className="h-[38px] w-[88px] bg-slate-200 rounded-[10px]" />
              </div>

              {/* Price Skeleton */}
              <div className="h-9 w-32 bg-slate-200 rounded mb-6" />

              <div className="flex flex-col gap-4">
                {/* Add to Cart Button Skeleton */}
                <div className="h-[56px] w-full bg-slate-200 rounded-[14px]" />

                {/* Sub Action Buttons Skeleton */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-[46px] bg-slate-200 rounded-[12px]" />
                  <div className="flex-[1.2] h-[46px] bg-slate-200 rounded-[12px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Might Like Section Skeleton */}
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100 mt-12">
          <div className="h-7 w-48 bg-slate-200 rounded mb-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 place-items-center sm:place-items-stretch">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-3 font-sans w-full mx-4 max-w-[260px] animate-pulse">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-200" />
                <div className="flex flex-col px-0.5">
                  <div className="h-[18px] w-3/4 bg-slate-200 rounded mb-2.5 mt-1" />
                  <div className="h-[18px] w-1/2 bg-slate-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
