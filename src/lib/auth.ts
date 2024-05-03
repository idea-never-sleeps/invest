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
      const list = [
        '22-067@ksa.hs.kr',
        '23-011@ksa.hs.kr',
        '23-050@ksa.hs.kr',
        '23-092@ksa.hs.kr',
        '24-026@ksa.hs.kr',
        '24-110@ksa.hs.kr',
        '24-089@ksa.hs.kr',
        '24-123@ksa.hs.kr',
        '23-103@ksa.hs.kr',
        '24-025@ksa.hs.kr',
        '24-029@ksa.hs.kr',
        '22-101@ksa.hs.kr',
        '22-015@ksa.hs.kr',
        '22-115@ksa.hs.kr',
        '22-075@ksa.hs.kr',
        '22-093@ksa.hs.kr',
        '22-086@ksa.hs.kr',
        '23-029@ksa.hs.kr',
        '24-102@ksa.hs.kr',
        '24-076@ksa.hs.kr',
        '24-080@ksa.hs.kr',
        '24-102@ksa.hs.kr',
        '22-054@ksa.hs.kr',
        '22-084@ksa.hs.kr',
        '22-055@ksa.hs.kr',
        '22-068@ksa.hs.kr',
        '23-015@ksa.hs.kr',
        '23-042@ksa.hs.kr',
        '23-017@ksa.hs.kr',
        '23-033@ksa.hs.kr',
        '23-052@ksa.hs.kr',
        '23-043@ksa.hs.kr',
        '23-110@ksa.hs.kr',
        '23-034@ksa.hs.kr',
        '24-006@ksa.hs.kr',
        '24-064@ksa.hs.kr',
        '24-115@ksa.hs.kr',
        '24-098@ksa.hs.kr',
        '24-009@ksa.hs.kr',
        '24-108@ksa.hs.kr',
        '24-036@ksa.hs.kr',
        '24-086@ksa.hs.kr',
        '24-016@ksa.hs.kr',
        '24-010@ksa.hs.kr',
        '24-093@ksa.hs.kr',
        '24-100@ksa.hs.kr',
        '23-109@ksa.hs.kr',
        '23-106@ksa.hs.kr',
        '23-111@ksa.hs.kr',
        '23-083@ksa.hs.kr',
        '23-024@ksa.hs.kr',
        '23-108@ksa.hs.kr',
        '24-013@ksa.hs.kr',
        '24-014@ksa.hs.kr',
        '24-083@ksa.hs.kr',
        '24-008@ksa.hs.kr',
        '24-018@ksa.hs.kr',
        '24-012@ksa.hs.kr',
        '24-075@ksa.hs.kr',
        '24-031@ksa.hs.kr',
        '23-012@ksa.hs.kr',
        '23-079@ksa.hs.kr',
        '23-035@ksa.hs.kr',
        '23-036@ksa.hs.kr',
        '24-072@ksa.hs.kr',
        '24-058@ksa.hs.kr',
        '24-059@ksa.hs.kr',
        '24-056@ksa.hs.kr',
        '24-109@ksa.hs.kr',
        '24-097@ksa.hs.kr',
        '24-104@ksa.hs.kr',
        '24-092@ksa.hs.kr',
        '23-128@ksa.hs.kr',
        '23-055@ksa.hs.kr',
        '23-094@ksa.hs.kr',
        '23-066@ksa.hs.kr',
        'issac4892@gmail.com',
        'ksa.hackathon.2024@gmail.com'
      ];

      if (account?.provider === 'google' && profile) {
        if (profile.email) {
          if (!list.includes(profile.email)) {
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

export type AuthSession = AdapterSession &
  Session & {
    user: AdapterUser & {
      id: string;
      admin: boolean;
      role: string;
    };
  };
