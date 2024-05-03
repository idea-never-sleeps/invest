import { db } from '@/lib/db';
import { investments, teams } from '@/lib/db/schema';
import { ne, eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import InvestClient from './client';
import { auth, AuthSession } from '@/lib/auth';

export default async function InvestPage() {
  const session = await auth() as AuthSession;
  if (!session) return redirect('/signin');

  const now = new Date();
  const start = new Date('May 4, 2024 16:00:00 GMT+0900');

  if (now < start) return redirect('/hub');

  const tms = await db.select().from(teams);
  const invs = await db
    .select()
    .from(investments)
    .where(eq(investments.userId, session.user.id));

    return (
    <InvestClient session={session} teams={tms} investments={invs} />
  );
}
