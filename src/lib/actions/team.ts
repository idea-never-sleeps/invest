'use server';

import { arrayContains, eq } from 'drizzle-orm';
import { auth, AuthSession } from '../auth';
import { db } from '../db';
import { teams } from '../db/schema';
import crypto from 'crypto';
import { s3 } from '../r2';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function updateDescription(description: string) {
  const session = (await auth()) as AuthSession;

  if (!session) {
    throw new Error('User not authenticated');
  }

  const now = new Date();
  const end = new Date('May 4, 2024 10:45:00 GMT+0900');

  if (now > end) {
    throw new Error('저장할 수 없습니다.');
  }

  const team = (
    await db
      .select()
      .from(teams)
      .where(arrayContains(teams.members, [session.user.id]))
  )[0];
  if (!team) {
    throw new Error('팀이 없습니다.');
  }

  try {
    if (team.itemDescription === description) {
      return;
    }
    if (description.length > 500) {
      throw new Error('500자 이내로 입력해주세요.');
    }
    if (description === '') {
      await db
        .update(teams)
        .set({ itemDescription: null })
        .where(eq(teams.id, team.id));
    } else {
      await db
        .update(teams)
        .set({ itemDescription: description })
        .where(eq(teams.id, team.id));
    }
    return;
  } catch (e) {
    throw new Error('팀 설명 업데이트에 실패했습니다.');
  }
}

export async function RequestIRUpload() {
  const session = (await auth()) as AuthSession;

  if (!session) {
    throw new Error('User not authenticated');
  }

  const now = new Date();
  const end = new Date('May 4, 2024 10:45:00 GMT+0900');

  if (now > end) {
    throw new Error('저장할 수 없습니다.');
  }

  const team = (
    await db
      .select()
      .from(teams)
      .where(arrayContains(teams.members, [session.user.id]))
  )[0];
  if (!team) {
    throw new Error('팀이 없습니다.');
  }

  const uuid = crypto.randomUUID();

  try {
    const url = getSignedUrl(s3, 
      new PutObjectCommand({
        Bucket: 'kic2024',
        Key: `${uuid}.pdf`,
        ContentType: 'application/pdf',
      }),
      { expiresIn: 3600 }
    );

    const newurl = `https://kic.migi.kim/${uuid}.pdf`
    await db
      .update(teams)
      .set({ pdfUrl: newurl })
      .where(eq(teams.id, team.id));
    return url;
  } catch (e) {
    throw new Error('IR 업로드 요청에 실패했습니다.');
  }
}