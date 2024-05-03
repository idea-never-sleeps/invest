'use client';

import LineBackground from '@/components/background';
import { RequestIRUpload, updateDescription } from '@/lib/actions/team';
import { AuthSession } from '@/lib/auth';
import { teams } from '@/lib/db/schema';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);
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

  const onFileClick = async () => {
    if (confirm('파일 업로드에 실패할 경우, 사이트에는 업로드 된 것으로 표시되나, 실제로는 업로드 되지 않습니다. 업로드에 실패하는 경우에는 다시 업로드해 주세요.')) {
      inputRef.current?.click();
    }
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDisabled(true);
    const inv = toast.loading('업로드 중...');
    try {
      const presigned = await RequestIRUpload();
      await fetch(presigned, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/pdf'
        },
        body: file
      });
      toast.success('업로드에 성공했습니다.', { id: inv });
      router.push('/hub');
    } catch (e) {
      console.error(e);
      toast.error('업로드에 실패했습니다.', { id: inv });
      window.location.reload();
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
        {team.pdfUrl && (
          <Link className='underline' target='_blank' href={team.pdfUrl}>
            PDF 보기
          </Link>
        )}
        <input type="file" ref={inputRef} accept='application/pdf' onChange={onFileChange} className='hidden' />
        <button onClick={onFileClick} disabled={disabled}>{team.pdfUrl ? 'IR 교체하기' : 'IR 등록하기'}</button>
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
