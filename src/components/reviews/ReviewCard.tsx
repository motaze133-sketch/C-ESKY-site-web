import React from 'react';
import { Review } from '@/lib/data/reviews';
import { StarRating } from './StarRating';
import { User, Tag, Sparkles, ShieldCheck } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <article className="bg-[#141416] p-6 sm:p-7 rounded-xl border border-[#27272A] hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col justify-between h-full font-sans text-[#F4F4F0] relative group">
      <div>
        {/* Header: Stars & Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <StarRating rating={review.rating} size="sm" />
          <div className="flex items-center gap-1.5">
            {review.isNew && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-black">
                Nouveau
              </span>
            )}
            {review.verified && (
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Vérifié
              </span>
            )}
          </div>
        </div>

        {/* Review Comment Body (verbatim preservation) */}
        {review.comment ? (
          <p className="text-xs sm:text-sm text-[#E8E7E0] leading-relaxed mb-6 whitespace-pre-line italic break-words">
            {review.comment}
          </p>
        ) : (
          <p className="text-xs text-[#71717A] italic mb-6">
            (Évaluation 5 étoiles déposée sans texte)
          </p>
        )}
      </div>

      {/* Footer: Author Name, Profile & Age */}
      <div className="pt-4 border-t border-[#27272A] space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1C1C20] border border-[#3F3F46] flex items-center justify-center text-[#D4AF37] shrink-0 font-serif font-bold text-xs">
            {review.authorName.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-xs sm:text-sm font-bold text-[#F4F4F0] truncate">
              {review.authorName}
            </h3>
            {review.profile && (
              <p className="text-[11px] text-[#A1A1AA] truncate">{review.profile}</p>
            )}
          </div>
        </div>

        {/* Metadata: Price & Age */}
        <div className="flex items-center justify-between text-[11px] text-[#71717A] pt-1">
          {review.priceNote ? (
            <span className="inline-flex items-center gap-1 text-[#D4AF37] font-mono">
              <Tag className="w-3 h-3" />
              {review.priceNote}
            </span>
          ) : (
            <span />
          )}

          {review.age && (
            <span className="italic">{review.age}</span>
          )}
        </div>
      </div>
    </article>
  );
};
