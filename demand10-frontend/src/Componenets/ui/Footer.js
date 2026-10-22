import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F1B3D] text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row gap-4 justify-between items-center text-sm">
        <p>Â© {new Date().getFullYear()} RankB2B. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/data" className="hover:text-white">Data</Link>
          <Link href="/categories" className="hover:text-white">Categories</Link>
          <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/term-policies" className="hover:text-white">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
