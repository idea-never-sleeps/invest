import type { Metadata } from "next";
import "./globals.scss";
import RootProvider from "./root-provider";
import { auth, AuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "2024 KIC",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth() as AuthSession;

  return (
    <html lang="ko">
      <body>
        <RootProvider session={session}>{children}</RootProvider>
      </body>
    </html>
  );
}
