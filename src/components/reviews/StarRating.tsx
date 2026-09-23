'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 1 to 5
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  interactive = false,
  onRatingChange,
  size = 'md',
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const activeRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div
      className="flex items-center gap-1"
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={interactive ? 'Sélectionner une note' : `Note de ${rating} étoiles sur 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= activeRating;

        if (interactive) {
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={star === rating}
              aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
              onClick={() => onRatingChange && onRatingChange(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              className="p-1 text-[#D4AF37] hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded"
            >
              <Star
                className={`${starSizes[size]} ${
                  isFilled ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#3F3F46] fill-none'
                }`}
              />
            </button>
          );
        }

        return (
          <Star
            key={star}
            className={`${starSizes[size]} ${
              isFilled ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#3F3F46] fill-none'
            }`}
          />
        );
      })}
    </div>
  );
};
