"use client";

import { Button } from "@/components/ui/button";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("session", session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {session?.user && session.user.image && (
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src={session.user.image}
            width={32}
            height={32}
            alt="avatar"
          />
          <p className="text-lg font-semibold">{session.user.name}</p>
        </div>
      )}
      {status === "authenticated" && (
        <Button className="mt-4" onClick={() => signOut()}>
          로그아웃
        </Button>
      )}
      {status === "unauthenticated" && (
        <Button onClick={() => signIn("kakao")}>카카오 계정으로 로그인</Button>
      )}
      {status === "authenticated" && (
        <Link href="/profile">
          <Button className="mt-4">프로필 수정</Button>
        </Link>
      )}
      <Button className="mt-4" onClick={() => getCsrfToken()}>
        CSRF
      </Button>
    </main>
  );
}
