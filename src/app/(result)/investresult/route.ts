import { auth, AuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { investments, teams, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = (await auth()) as AuthSession;
  if (!session) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  if (session.user.email !== "ksa.hackathon.2024@gmail.com") {
    return NextResponse.json({ error: "You are not authorized to access this page" }, { status: 403 });
  }

  const result = await db.select({
    teamName: teams.name,
    userName: users.name,
    userEmail: users.email,
    amount: investments.amount,
  }).from(investments).innerJoin(users, eq(investments.userId, users.id)).innerJoin(teams, eq(investments.teamId, teams.id));

  // to csv
  let csv = result.map((row) => Object.values(row).join(",")).join("\n");
  csv = "teamName,userName,userEmail,amount\n" + csv;

  const response = new NextResponse(csv, { status: 200 })
  response.headers.set('Content-Type', 'text/csv')
  const now = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Seoul' })
  response.headers.set('Content-Disposition', `attachment; filename=investments-${now}.csv`)
  // utf-8
  response.headers.set('Content-Encoding', 'utf-8')
  return response
}