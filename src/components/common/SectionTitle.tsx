import React from 'react';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center';
  badge?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  description,
  alignment = 'center',
  badge,
}) => {
  const isCenter = alignment === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {badge && (
        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 mb-3">
          {badge}
        </span>
      )}

      {subtitle && (
        <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-2 font-sans">
          {subtitle}
        </p>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#F4F4F0] tracking-tight leading-tight break-words">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-sm sm:text-base text-[#A1A1AA] leading-relaxed font-sans break-words">
          {description}
        </p>
      )}
    </div>
  );
};
