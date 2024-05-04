import LineBackground from '@/components/background';
import { auth, AuthSession } from '@/lib/auth';
import Link from 'next/link';

export default async function HubPage() {
  const session = (await auth()) as AuthSession;
  const now = new Date();
  const subend = new Date('May 4, 2024 12:00:00 GMT+0900');
  const invstart = new Date('May 4, 2024 16:00:00 GMT+0900');

  const submissionDone = now > subend;
  const investmentStarted = now > invstart;

  return (
    <div className="h-screen w-screen flex items-center justify-center gap-4 flex-col">
      <LineBackground />
      <div className="flex flex-col gap-4 text-center">
        <div className="text-2xl">
          <span className="font-bold">{session.user.name}</span>님,
          <br />
          아래에서 동작을 선택해주세요.
        </div>
        <div className="flex gap-4 items-center">
          {!submissionDone ? (
            <Link href="/submit">
              <button>IR 제출하기</button>
            </Link>
          ) : (
            <button className='text-sm font-medium button-outline'>IR 제출이 마감되었습니다.</button>
          )}
          {investmentStarted ? (
            <Link href="/invest">
              <button>투자하기</button>
            </Link>
          ) : (
            <button className='text-sm font-medium button-outline'>투자가 아직 시작되지 않았습니다.</button>
          )}
        </div>
      </div>
    </div>
  );
}
