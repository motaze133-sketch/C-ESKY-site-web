'use client';

import React, { useState } from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { AUTHENTIC_REVIEWS, Review } from '@/lib/data/reviews';
import { ReviewsCarousel } from './ReviewsCarousel';
import { ReviewModal } from './ReviewModal';
import { MessageSquarePlus } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(
    AUTHENTIC_REVIEWS.filter((r) => r.status === 'approved')
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReviewSubmitted = (newReview: Review) => {
    // New reviews have status: 'pending' (moderation queue)
    // They are stored locally or sent to backend, but not publicly approved automatically
    console.log('Nouvel avis en attente de modération:', newReview);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24" id="avis-clients">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <SectionTitle
            badge="Témoignages & Preuve Sociale"
            subtitle="« Découvrez les expériences partagées par nos visiteurs. »"
            title="ILS PARLENT DE C’ESKY"
            alignment="left"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#C5A059] transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-white shadow-lg shadow-[#D4AF37]/15"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Partager Mon Expérience</span>
        </button>
      </div>

      {/* Reviews Carousel */}
      <ReviewsCarousel reviews={reviewsList} />

      {/* Interactive Submission Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  );
};
