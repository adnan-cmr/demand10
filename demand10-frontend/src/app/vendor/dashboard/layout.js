import UserDashboardClient from '@/Componenets/UserDashboard/UserDashboardClient';

export const metadata = {
  title: "Vendor Dashboard | Demand10",
  description: "Manage your company claims, reviews, and listings in your personalized vendor dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UserDashboardLayout({ children }) {
  return <UserDashboardClient>{children}</UserDashboardClient>;
}