import { Suspense } from 'react';

export const metadata = {
  title: "Reset Password | RankB2B",
  description: "Set a new password for your RankB2B account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordLayout({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}