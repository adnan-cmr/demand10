import Link from 'next/link';
import { fetchTopLists } from '@/services/publicDataApi';

export const metadata = {
  title: 'Top 10 Lists by Category',
  description: 'Curated top 10 company rankings across categories.',
  alternates: { canonical: '/categories' },
};

export default async function CategoriesPage() {
  const res = await fetchTopLists();
  const lists = res?.lists || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-[#0F1B3D]">Top 10 by Category</h1>
      <p className="text-gray-600 mt-1">Hand-picked rankings of the leading companies in each category.</p>

      {!lists.length && <p className="mt-8 text-gray-500">No lists published yet.</p>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lists.map((l) => (
          <Link key={l._id} href={`/categories/${l.slug}`} className="block bg-white border rounded-xl p-5 hover:shadow-md transition-shadow">
            <h2 className="font-semibold text-lg text-[#0F1B3D]">Top {l.count}: {l.title}</h2>
            {l.description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{l.description}</p>}
            <p className="text-xs text-gray-500 mt-3">{l.preview.map((p) => p.name).join(' · ')}{l.count > 3 ? ' …' : ''}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
