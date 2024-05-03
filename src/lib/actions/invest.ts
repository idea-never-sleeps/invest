'use server';

import { auth, AuthSession } from "@/lib/auth";
import { db } from "../db";
import { investments, teams } from "../db/schema";
import { arrayContains, eq, inArray } from "drizzle-orm";

export interface InvestData {
  team_id: string;
  amount: number;
}

export async function makeInvestment(data: InvestData[]) {
  const session = await auth() as AuthSession;
  if (!session) {
    throw new Error("User not authenticated");
  }

  const now = new Date();
  const invstart = new Date('May 4, 2024 16:00:00 GMT+0900');

  const submissionDone = now < invstart;

  if (submissionDone) {
    throw new Error("아직 투자할 수 없습니다.");
  }

  // get user's team
  const team = await db.select({
    field1: teams.id,
  }).from(teams).where(arrayContains(teams.members, [session.user.id]));

  if (team[0].toString() in data.map((investment) => investment.team_id)){
    throw new Error("스스로 투자할 수 없습니다.");
  }

  // check if amount is less than 100,000
  const totalInvestment = data.reduce((acc, investment) => acc + investment.amount, 0);
  if (totalInvestment > 100000) {
    throw new Error("100,000킥 이하로 투자해주세요.");
  }

  await db.transaction(async (trx) => {
    // remove existing investments
    await trx.delete(investments).where(eq(investments.userId, session.user.id));
    for (const investment of data) {
      await trx.insert(investments).values({
        userId: session.user.id,
        teamId: investment.team_id,
        amount: investment.amount,
      });
    }
  })
}