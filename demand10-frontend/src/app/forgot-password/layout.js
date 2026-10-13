import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Forgot Password | Demand10",
  description: "Reset your password for your Deman10 account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}