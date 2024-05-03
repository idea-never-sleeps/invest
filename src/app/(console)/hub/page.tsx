import LineBackground from '@/components/background';
import { auth, AuthSession } from '@/lib/auth';
import Link from 'next/link';

export default async function HubPage() {
  const session = (await auth()) as AuthSession;
  const now = new Date();
  const subend = new Date('May 4, 2024 10:45:00 GMT+0900');

  const submissionDone = now > subend;

  return (
    <div className="h-screen w-screen flex items-center justify-center gap-4 flex-col">
      <LineBackground />
      <div className="flex flex-col gap-4 text-center">
        <div className="text-2xl">
          <span className="font-bold">{session.user.name}</span>님,
          <br />
          아래에서 동작을 선택해주세요.
        </div>
        <div className="flex gap-4">
          {!submissionDone && (
            <Link href="/submit">
              <button>IR 제출하기</button>
            </Link>
          )}
          <Link href="/invest">
            <button>투자하러 가기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
