import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import { AuthProvider } from "@/components/providers/AuthProvider";
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
  description: "나만의 스타일, 모두의 코디! 어떻게 입을지 고민될 땐 핏포에서 답을 찾아보세요",
  openGraph: {
    title: `Fit4`,
    description: `나만의 스타일, 모두의 코디! 어떻게 입을지 고민될 땐 핏포에서 답을 찾아보세요`,
    url: `https://fit4.vercel.app`
  }
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
      <AuthProvider>
        <TQProviders>
          <body className={`${pretendard.className} text-body text-text-04`}>
            <Header />
            <main className="relative mx-auto w-full max-w-[1200px] pt-20 tb:pb-[77px] tb:pt-0">{children}</main>
            {modal && <div>{modal}</div>}
            <NavBar />
          </body>
        </TQProviders>
      </AuthProvider>
    </html>
  );
}
