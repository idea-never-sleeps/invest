'use client';

import LineBackground from '@/components/background';
import { AuthSession } from '@/lib/auth';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function MainPage() {
  const session = useSession();

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LineBackground />
      <div className="flex flex-col gap-4 text-center">
        <div className="text-4xl">
          안녕하세요,{' '}
          {session.data && `${(session.data as AuthSession).user.name}님,`}
        </div>
        <div>
          <span className="font-extrabold text-4xl">
            2024 KIC 참가자 플랫폼
          </span>
          <span className="text-4xl">입니다.</span>
        </div>
        {!session.data && <div className="text-md">로그인해서 계속하세요.</div>}
        {!session.data ? (
          <Link href="/signin">
            <button className="mt-4">로그인</button>
          </Link>
        ) : (
          <div className="mt-4 space-x-4">
            <Link href="/hub">
              <button>계속하기</button>
            </Link>
            <button className="button-outline" onClick={() => signOut()}>
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
