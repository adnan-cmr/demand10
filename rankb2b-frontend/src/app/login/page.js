"use client";

import { useRouter } from 'next/navigation';
import AuthForm from '@/Componenets/ui/AuthForm';

export default function LoginPage() {
  const router = useRouter();

  return (
    <AuthForm
      initialView="login"
      onClose={() => router.push('/')}
      onAuthSuccess={() => {}}
    />
  );
}
