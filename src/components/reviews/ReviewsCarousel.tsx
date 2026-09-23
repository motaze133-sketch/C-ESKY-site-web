'use client';

import React, { useState, useRef, useEffect, TouchEvent } from 'react';
import { Review } from '@/lib/data/reviews';
import { ReviewCard } from './ReviewCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewsCarouselProps {
  reviews: Review[];
}

export const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Dynamic responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Carousel des avis clients C’ESKY"
      role="region"
    >
      {/* Carousel Track Container */}
      <div className="overflow-hidden px-1 py-2">
        <div
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="shrink-0"
              style={{
                width: `calc(${100 / itemsPerPage}% - ${(24 * (itemsPerPage - 1)) / itemsPerPage}px)`,
              }}
            >
              <ReviewCard review={rev} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Pagination des avis">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={currentIndex === idx}
              aria-label={`Aller à la page d’avis ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-6 bg-[#D4AF37]'
                  : 'w-2 bg-[#27272A] hover:bg-[#3F3F46]'
              }`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Avis précédent"
            className="p-3 rounded-full bg-[#141416] border border-[#27272A] text-[#F4F4F0] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Avis suivant"
            className="p-3 rounded-full bg-[#141416] border border-[#27272A] text-[#F4F4F0] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
