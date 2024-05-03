'use client';

import LineBackground from '@/components/background';
import { googleSignIn } from '@/lib/actions/auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.data) router.push('/hub');
  }, [router, session.data]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <LineBackground />
      <div className="space-y-4 text-center">
        <div className="text-2xl">
          <span className="font-bold">@ksa.hs.kr</span> 계정으로 로그인해주세요.
        </div>
        <div className="flex gap-4 mt-4">
          <button className='button-outline' onClick={() => router.push('/')}>돌아가기</button>
          <form action={googleSignIn}>
            <button>계속 진행하기</button>
          </form>
        </div>
      </div>
    </div>
  );
}
