import Link from "next/link";
import { fetchTopLists } from "@/services/publicDataApi";

export default async function Home() {
  const res = await fetchTopLists();
  const lists = (res?.lists || []).slice(0, 6);

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F1B3D]">Company data, ranked and searchable</h1>
        <p className="mt-4 text-lg text-gray-600">Browse the full company database or explore curated top 10 lists by category.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/data" className="bg-[#E11D2E] text-white px-6 py-3 rounded-lg font-semibold">Browse data</Link>
          <Link href="/categories" className="border border-[#0F1B3D] text-[#0F1B3D] px-6 py-3 rounded-lg font-semibold">Top 10 lists</Link>
        </div>
      </section>

      {lists.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[#0F1B3D] mb-4">Featured top 10s</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lists.map((l) => (
              <Link key={l._id} href={`/categories/${l.slug}`} className="block bg-white border rounded-xl p-5 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-[#0F1B3D]">Top {l.count}: {l.title}</h3>
                <p className="text-xs text-gray-500 mt-2">{l.preview.map((p) => p.name).join(" · ")}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
