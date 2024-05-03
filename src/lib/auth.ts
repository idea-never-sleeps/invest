import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { Profile, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db } from './db';
import { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters';

// Auth options
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        const manager = profile.email === 'ksa.hackathon.2024@gmail.com';
        return {
          ...profile,
          role: manager ? 'manager' : 'participant'
        };
      }
    })
  ],
  callbacks: {
    session: async ({ session, user }: { session: any; user: any }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          admin: user.role === 'manager'
        }
      };
    },
    signIn: async ({ profile, account }) => {
      if (account?.provider === 'google' && profile) {
        if (profile.email) {
          if (
            !profile.email.endsWith('@ksa.hs.kr') &&
            profile.email !== 'ksa.hackathon.2024@gmail.com' &&
            profile.email !== 'issac4892@gmail.com'
          ) {
            return false;
          }
        }
      }
      return true;
    }
  },
  theme: {
    colorScheme: 'light'
  },
  pages: {
    signIn: '/signin'
  }
});

export type AuthSession = AdapterSession & Session & {
  user: AdapterUser & {
    id: string;
    admin: boolean;
    role: string;
  };
};
