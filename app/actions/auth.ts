'use server';

import { redirect } from 'next/navigation';
import { createSession, destroySession } from '@/lib/auth';

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (username !== 'admin' || password !== 'bookhub') {
    redirect('/login?error=invalid');
  }

  await createSession();
  const from = formData.get('from') as string | null;
  redirect(from || '/');
}

export async function logout() {
  await destroySession();
  redirect('/login');
}
