import { Suspense } from 'react';

export const metadata = {
  title: "Verify Email | RankB2B",
  description: "Verify your email address for your RankB2B account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyEmailLayout({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}