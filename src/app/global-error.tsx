"use client";
import ErrorScreen from "@/components/common/ErrorScreen";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard"
});

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className={`${pretendard.className} relative text-body text-text-04`}>
        <ErrorScreen error={error} reset={reset} />
      </body>
    </html>
  );
}
