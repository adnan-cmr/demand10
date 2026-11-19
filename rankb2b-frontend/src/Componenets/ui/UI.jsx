import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

export const Badge = ({ children, tone = 'default' }) => {
  const tones = {
    default: 'bg-gray-100 text-gray-700',
    red: 'bg-red-50 text-[#E11D2E]',
    navy: 'bg-[#0F1B3D] text-white',
    outline: 'border border-[#E11D2E] text-[#E11D2E] bg-white',
  };
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${tones[tone]}`}>{children}</span>;
};

export const StatBlock = ({ value, label }) => (
  <div className="text-center">
    <p className="text-3xl sm:text-4xl font-extrabold text-[#0F1B3D]">{value}</p>
    <p className="mt-1 text-sm font-medium text-gray-500">{label}</p>
  </div>
);

export const SectionHeader = ({ title, subtitle, href, linkText = 'View all' }) => (
  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-[#0F1B3D]">{title}</h2>
      {subtitle && <p className="mt-2 text-lg text-gray-600 max-w-2xl">{subtitle}</p>}
    </div>
    {href && (
      <Link href={href} className="inline-flex items-center text-[#E11D2E] font-semibold hover:underline whitespace-nowrap">
        {linkText} <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    )}
  </div>
);

export const RatingBadge = ({ score = 4.8, reviews = 0 }) => (
  <div className="inline-flex items-center gap-1.5 bg-[#0F1B3D] text-white rounded-lg px-2.5 py-1 text-xs font-semibold">
    <Star className="h-3 w-3 fill-[#E11D2E] text-[#E11D2E]" />
    {score.toFixed(1)}
    {reviews > 0 && <span className="text-white/60 font-normal">({reviews})</span>}
  </div>
);