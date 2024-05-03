'use server';

import { redirect } from 'next/navigation';
import { auth, AuthSession, signIn } from '../auth';

export async function getSession(checkAuth = true) {
  let session = await auth();
  if (checkAuth && !session) redirect('/signin');

  let _session: AuthSession = session as AuthSession;
  return _session;
}

export async function googleSignIn() {
  await signIn('google', { redirectTo: '/hub' });
}
