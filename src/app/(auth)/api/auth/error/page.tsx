"use client";

import LineBackground from "@/components/background";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AuthError() {
  const params = useParams<{ error: string }>();

  const errorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "Configuration":
        return "설정에 문제가 있습니다. 운영진에게 문의하세요.";
      case "AccessDenied":
        return "접근 권한이 없습니다. 운영진에게 문의하세요.";
      case "Verification":
        return "인증에 실패했습니다. 다시 시도해주세요.";
      default:
        return "알 수 없는 오류가 발생했습니다. 운영진에게 문의하세요.";
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LineBackground />
      <div className="flex flex-col items-center gap-4">
        <span className="font-medium text-lg">{errorMessage(params.error)}</span>
        <Link href="/">
          <button>메인 화면으로 돌아가기</button>
        </Link>
      </div>
    </div>
  );
}
