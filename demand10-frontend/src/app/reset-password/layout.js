import { Suspense } from 'react';

export const metadata = {
  title: "Reset Password | Demand10",
  description: "Set a new password for your Demand10 account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordLayout({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}