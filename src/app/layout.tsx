import Header from "@/components/layout/Header";
import TQProviders from "@/components/providers/TQProvider";
import "@/lib/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "Fit4",
  description: "3조 최종프로젝트 개발중"
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="min-h-full">
      <TQProviders>
        <body className={`${pretendard.className} mx-auto w-[1200px] text-body text-text-04`}>
          <Header />
          <main className="pt-10">{children}</main>
          {modal && <div>{modal}</div>}
        </body>
      </TQProviders>
    </html>
  );
}
