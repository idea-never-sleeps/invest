import LineBackground from "@/components/background";
import { auth, AuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { teams } from "@/lib/db/schema";
import { arrayContains } from "drizzle-orm";
import { redirect } from "next/navigation";
import ClientSubmit from "./client";

export default async function SubmitPage() {
  const session = await auth() as AuthSession;
  if (!session) return redirect('/signin');

  const now = new Date();
  const subend = new Date('May 12, 2024 12:00:00 GMT+0900');

  const submissionDone = now > subend;
  if (submissionDone) return redirect('/hub');

  const team = await db.select().from(teams).where(arrayContains(teams.members, [session.user.id]));
  if (!team.length) return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LineBackground />
      <div className="text-4xl font-bold">팀이 없습니다!</div>
    </div>
  );


  return <ClientSubmit session={session} team={team[0]} />;
}
