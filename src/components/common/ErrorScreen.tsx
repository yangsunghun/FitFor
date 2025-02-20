"use client";
import errorImage from "@/assets/images/error.png";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset?: () => void;
};

const ErrorScreen = ({ error, reset }: Props) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);
  return (
    <section className="fixed inset-0 m-auto flex items-center justify-center">
      <article className="text-center">
        <h2 className="text-heading font-bold mb:text-title1">지금 이 서비스와 연결할 수 없습니다!</h2>
        <p className="mt-6 text-subtitle font-medium text-text-03 mb:text-body">
          문제를 해결하기 위해 열심히 노력하고 있습니다.
          <br />
          이용에 불편함을 드려 죄송합니다.
        </p>

        <Image src={errorImage} alt="에러 이미지" className="my-16 tb:w-[80vw] mb:my-[40px]" />

        <div className="flex w-full justify-center gap-2">
          <Button asChild variant="primary" size="lg" className="min-w-40">
            <Link href="/">홈으로</Link>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              setTimeout(() => {
                reset?.();
              }, 0);
            }}
            className="min-w-40"
          >
            다시 시도
          </Button>
        </div>
      </article>
    </section>
  );
};

export default ErrorScreen;
