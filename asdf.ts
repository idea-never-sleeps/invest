import { db } from '@/lib/db';
import { teams } from '@/lib/db/schema';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local'})

const asdf = (async () => {

await db.insert(teams).values({
  name: 'Team 2',
  leaderId: 'd8d022ba-af70-4f81-9012-8df33d57a95b',
  members: ['d8d022ba-af70-4f81-9012-8df33d57a95b'],
})

await db.insert(teams).values({
  name: 'Team 3',
  leaderId: 'd8d022ba-af70-4f81-9012-8df33d57a95b',
  members: ['d8d022ba-af70-4f81-9012-8df33d57a95b'],
})

await db.insert(teams).values({
  name: 'Team 4',
  leaderId: 'd8d022ba-af70-4f81-9012-8df33d57a95b',
  members: ['d8d022ba-af70-4f81-9012-8df33d57a95b'],
})

await db.insert(teams).values({
  name: 'Team 5',
  leaderId: 'd8d022ba-af70-4f81-9012-8df33d57a95b',
  members: ['d8d022ba-af70-4f81-9012-8df33d57a95b'],
})

})

asdf()
