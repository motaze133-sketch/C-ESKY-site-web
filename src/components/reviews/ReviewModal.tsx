'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import { StarRating } from './StarRating';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted?: (newReview: any) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewSubmitted,
}) => {
  const [authorName, setAuthorName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [consentRequired, setConsentRequired] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim() || !consentRequired) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      const newReview = {
        id: `user-rev-${Date.now()}`,
        authorName: authorName.trim(),
        rating,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
        status: 'pending', // Moderation requirement: pending until approved
      };

      if (onReviewSubmitted) {
        onReviewSubmitted(newReview);
      }

      setStatus('success');
    }, 800);
  };

  const handleResetAndClose = () => {
    setStatus('idle');
    setAuthorName('');
    setEmail('');
    setRating(5);
    setComment('');
    setConsentRequired(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Partager votre expérience C’ESKY"
    >
      <div className="relative max-w-lg w-full max-h-[92vh] overflow-y-auto bg-[#141416] border border-[#27272A] rounded-2xl p-6 sm:p-8 shadow-2xl font-sans text-[#F4F4F0]">
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-[#71717A] hover:text-[#F4F4F0] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          aria-label="Fermer la boîte de dialogue"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-[#25D366] mx-auto" />
            <h2 className="text-xl font-serif font-bold">Avis Transmis</h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              « Merci pour votre avis. Il sera publié après vérification par nos équipes. »
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="mt-4 px-6 py-2.5 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider rounded-md hover:bg-[#C5A059] transition-all"
            >
              Fermer
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-xl font-serif font-bold">Partager Mon Expérience</h2>
            </div>
            <p className="text-xs text-[#A1A1AA] mb-6">
              Votre retour est précieux pour l’amélioration continue de nos prestations.
            </p>

            {status === 'error' && (
              <div className="p-3 mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded">
                Veuillez remplir votre nom, votre commentaire et accepter les conditions de publication.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Selection */}
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Votre Note <span className="text-[#D4AF37]">*</span>
                </label>
                <div className="bg-[#0B0B0C] p-3 rounded border border-[#27272A] inline-block">
                  <StarRating
                    rating={rating}
                    interactive
                    onRatingChange={(r) => setRating(r)}
                    size="lg"
                  />
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label htmlFor="rev-author" className="block text-xs font-semibold mb-1">
                  Nom & Prénom / Pseudo <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  id="rev-author"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                  placeholder="Ex : Jean D."
                />
              </div>

              {/* Email (Optional & Private) */}
              <div>
                <label htmlFor="rev-email" className="block text-xs font-semibold mb-1">
                  Email (Non publié publiquement)
                </label>
                <input
                  type="email"
                  id="rev-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="rev-comment" className="block text-xs font-semibold mb-1">
                  Votre Avis <span className="text-[#D4AF37]">*</span>
                </label>
                <textarea
                  id="rev-comment"
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-[#0B0B0C] border border-[#27272A] text-sm text-[#F4F4F0] focus:border-[#D4AF37] focus:outline-none"
                  placeholder="Racontez votre expérience au complexe C’ESKY..."
                />
              </div>

              {/* Data Minimization Consent */}
              <div className="pt-1 text-xs text-[#A1A1AA]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consentRequired}
                    onChange={(e) => setConsentRequired(e.target.checked)}
                    className="mt-0.5 accent-[#D4AF37] rounded"
                  />
                  <span>
                    J’autorise C’ESKY à publier mon prénom et mon avis après vérification par les modérateurs. <span className="text-[#D4AF37]">*</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-3.5 px-6 rounded-md bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-wider hover:bg-[#C5A059] transition-all disabled:opacity-50 mt-2"
              >
                {status === 'submitting' ? 'Envoi en cours...' : 'Soumettre mon avis'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
