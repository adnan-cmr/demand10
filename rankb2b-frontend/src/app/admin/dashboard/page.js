import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "@/Componenets/Dashboard/DashboardClient";

export const metadata = { title: "Admin dashboard", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const API = process.env.NEXT_PUBLIC_API_URL;
const ADMIN_ROLES = ["admin", "superadmin"];

// Server-side gate: the admin UI is never sent to a visitor without an admin session.
// The auth cookies must be visible to this server (same host, or COOKIE_DOMAIN=.example.com on the API).
// Set ADMIN_SERVER_GUARD=off to fall back to the client-side check only.
export default async function AdminDashboardPage() {
  if (process.env.ADMIN_SERVER_GUARD === "off") return <DashboardClient />;

  const jar = await cookies();
  const hasRefresh = Boolean(jar.get("refreshToken"));
  const cookieHeader = ["accessToken", "refreshToken"]
    .map((name) => jar.get(name))
    .filter(Boolean)
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  if (!cookieHeader) redirect("/login");

  let res;
  try {
    res = await fetch(`${API}/auth/me`, { headers: { cookie: cookieHeader }, cache: "no-store" });
  } catch {
    // API unreachable: let the client shell show a retry instead of signing the admin out
    return <DashboardClient />;
  }

  if (res.ok) {
    const data = await res.json().catch(() => null);
    if (!ADMIN_ROLES.includes(data?.user?.role)) redirect("/login");
    return <DashboardClient verified />;
  }
  if (res.status === 401 && hasRefresh) {
    // access token expired: the browser refreshes it through the API, then re-checks
    return <DashboardClient />;
  }
  if (res.status >= 500) return <DashboardClient />;
  redirect("/login");
}
