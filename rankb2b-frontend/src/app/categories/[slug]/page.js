import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchTopList } from '@/services/publicDataApi';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await fetchTopList(slug);
  const l = res?.list;
  if (!l) return { title: 'List not found' };
  return {
    title: `Top ${l.entries.length} ${l.title}`,
    description: l.description || `Top ${l.entries.length} companies: ${l.title}`,
    keywords: [...new Set([l.title, `top ${l.title}`, ...l.entries.flatMap((e) => [e.name, ...(e.keywords || []).slice(0, 5)])])].slice(0, 40),
    alternates: { canonical: `/categories/${slug}` },
  };
}

export default async function TopListPage({ params }) {
  const { slug } = await params;
  const res = await fetchTopList(slug);
  const list = res?.list;
  if (!list) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/categories" className="text-sm text-gray-500 hover:underline">← All categories</Link>
      <h1 className="text-3xl font-bold text-[#0F1B3D] mt-2">Top {list.entries.length}: {list.title}</h1>
      {list.description && <p className="text-gray-600 mt-2">{list.description}</p>}

      <ol className="mt-8 space-y-4">
        {list.entries.map((e, i) => (
          <li key={e._id} className="bg-white border rounded-xl p-5 flex gap-4">
            <div className="text-3xl font-bold text-[#E11D2E] w-10 shrink-0">{i + 1}</div>
            {e.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={e.logo} alt="" className="w-14 h-14 rounded object-contain bg-gray-50 shrink-0" loading="lazy" />
            )}
            <div className="min-w-0">
              <h2 className="font-semibold text-lg text-[#0F1B3D]">
                {e.profilePath ? <Link href={e.profilePath} className="hover:underline">{e.name}</Link> : e.name}
              </h2>
              <p className="text-xs text-gray-500">
                {[e.industry, [e.city, e.country].filter(Boolean).join(', '), e.employees ? `${e.employees.toLocaleString()} employees` : '']
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              {e.description && <p className="text-sm text-gray-700 mt-2">{e.description}</p>}
              {e.website && (
                <a href={e.website} target="_blank" rel="noopener noreferrer nofollow" className="text-sm text-[#E11D2E] hover:underline mt-2 inline-block">
                  Visit website
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
