import { Suspense } from 'react';

export const metadata = {
  title: "Verify Email | Demand10",
  description: "Verify your email address for your Demand10 account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyEmailLayout({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}