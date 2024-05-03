'use client';

import LineBackground from '@/components/background';
import { updateDescription } from '@/lib/actions/team';
import { AuthSession } from '@/lib/auth';
import { teams } from '@/lib/db/schema';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ClientSubmit({
  session,
  team
}: {
  session: AuthSession;
  team: typeof teams.$inferSelect;
}) {
  const [description, setDescription] = useState(team.itemDescription?.toString());
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setDisabled(true);
    const inv = toast.loading('저장 중...');
    try {
      await updateDescription(description || '');
      toast.success('저장되었습니다.', { id: inv });
      router.push('/hub');
    } catch (e) {
      console.error(e);
      toast.error('저장에 실패했습니다.', { id: inv });
    }
    setDisabled(false);
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-4 items-center justify-center">
      <LineBackground />
      <div className="text-4xl">
        <span className="font-bold">{team.name}</span> 수정하기
      </div>
      <div className="flex gap-4 items-center">
        <div>IR 상태: {team.pdfUrl ? '등록 완료' : '등록되지 않음'}</div>
        <button disabled={disabled}>{team.pdfUrl ? 'IR 교체하기' : 'IR 등록하기'}</button>
      </div>

      <textarea
        className="rounded-md w-[500px] h-[200px] bg-white p-4 border-2 border-black bg-opacity-40"
        placeholder="아이템에 대한 간략한 설명을 작성해주세요. (500자 이내)"
        value={description}
        onChange={(e) => {
          if (e.target.value.length > 500) {
            toast.error('500자 이내로 작성해주세요.');
            return;
          };
          setDescription(e.target.value);
        }}
        disabled={disabled}
      />
      <div className='flex w-[500px] justify-between items-center'>
        <Link href="/hub">
          <button className='button-outline' disabled={disabled}>돌아가기</button>
        </Link>
        <button onClick={handleSubmit} disabled={disabled}>저장하기</button>
      </div>
    </div>
  );
}
