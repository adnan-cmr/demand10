"use client";

import { useRouter } from 'next/navigation';
import AuthForm from '@/Componenets/ui/AuthForm';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <AuthForm
      initialView="signup"
      onClose={() => router.push('/')}
      onAuthSuccess={() => {}}
    />
  );
}
