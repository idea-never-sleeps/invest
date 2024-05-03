'use client';

import { AuthSession } from '@/lib/auth';
import { teams as _teams, investments as _investments } from '@/lib/db/schema';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';
import { InvestData, makeInvestment } from '@/lib/actions/invest';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { commaizeNumber } from '@toss/utils';

export default function InvestClient({
  session,
  teams,
  investments
}: {
  session: AuthSession;
  teams: (typeof _teams.$inferSelect)[];
  investments: (typeof _investments.$inferSelect)[];
}) {
  const [currentInvestments, setCurrentInvestments] = useState<InvestData[]>(
    investments.map((inv) => ({
      team_id: inv.teamId,
      amount: inv.amount
    }))
  );
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const usedAmount = currentInvestments.reduce(
    (acc, inv) => acc + inv.amount,
    0
  );

  const handleSubmit = async () => {
    setSubmitting(true);
    const inv = toast.loading('투자 중...');
    if (100000 - usedAmount < 0) {
      toast.error('투자 금액은 100,000킥 미만이어야 합니다.', { id: inv });
      setSubmitting(false);
      return;
    }
    try {
      await makeInvestment(currentInvestments);
      toast.success('투자가 완료되었습니다.', { id: inv });
      router.push('/hub');
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message, { id: inv });
      } else {
        toast.error('투자에 실패했습니다. 다시 시도해 주세요.', { id: inv });
      }
    }
  };

  const onInvest = (teamId: string, amount: number) => {
    if (amount === 0) {
      const newInvestments = currentInvestments.filter(
        (inv) => inv.team_id !== teamId
      );
      setCurrentInvestments(newInvestments);
      return;
    }
    // if exists, update
    const newInvestments = currentInvestments.map((inv) =>
      inv.team_id === teamId ? { ...inv, amount } : inv
    );
    // if not exists, add
    if (!newInvestments.find((inv) => inv.team_id === teamId)) {
      newInvestments.push({ team_id: teamId, amount });
    }
    setCurrentInvestments(newInvestments);
  };

  return (
    <div className="w-screen min-h-screen p-12 flex items-center justify-center">
      <div className="min-w-[450px] max-w-[1500px] flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div className="flex gap-3 items-end">
            <Link href="/hub">
              <span className="underline text-sm">돌아가기</span>
            </Link>
            <div className="text-4xl font-bold">투자하기</div>
          </div>
          <div className="text-md font-medium">
            남은 투자금:{' '}
            <span className={100000 - usedAmount < 0 ? 'text-red-500' : ''}>
              {commaizeNumber(100000 - usedAmount)}킥
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {teams.map((team) => {
            const investment = currentInvestments.find(
              (inv) => inv.team_id === team.id
            );
            return (
              <TeamCard
                key={team.id}
                team={team}
                investment={investment}
                onInvest={onInvest}
              />
            );
          })}
        </div>
        <div className="w-full flex justify-end items-center">
          <button disabled={submitting} onClick={handleSubmit}>
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

function TeamCard({
  team,
  investment,
  onInvest
}: {
  team: typeof _teams.$inferSelect;
  investment?: InvestData;
  onInvest: Function;
}) {
  const onPlus = () => {
    onInvest(team.id, (investment?.amount || 0) + 10000);
  }

  const onMinus = () => {
    if (investment?.amount === 0) return;
    onInvest(team.id, (investment?.amount || 0) - 10000);
  }

  return (
    <div className="p-4 flex flex-col gap-2 w-[350px] rounded-lg bg-[#f7f7f7]">
      <div className="font-semibold text-md">{team.name}</div>
      <div className='text-sm'>{team.pdfUrl ? <Link className='underline' href={team.pdfUrl}>IR 보러 가기</Link> : 'IR이 존재하지 않습니다.'}</div>
      <div className="text-sm">
        {!!team.itemDescription ? team.itemDescription : '설명이 없습니다.'}
      </div>
      <div className="w-full flex items-center justify-end">
        <div className="flex gap-4 rounded-[40px] bg-black text-white p-2 select-none">
          <div className='cursor-pointer' onClick={onMinus}>
            <Minus />
          </div>
          <span className="text-sm my-auto">
            {commaizeNumber(investment?.amount || 0)}킥
          </span>
          <div className='cursor-pointer' onClick={onPlus}>
            <Plus />
          </div>
        </div>
      </div>
    </div>
  );
}
