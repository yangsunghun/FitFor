import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import { AuthProvider } from "@/components/providers/AuthProvider";
import ModalProvider from "@/components/providers/ModalProvider";
import TQProviders from "@/components/providers/TQProvider";
import Toast from "@/components/shared/Toast";
import "@/lib/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "FitFor",
  description: "나만의 스타일, 모두의 코디! 어떻게 입을지 고민될 땐 핏포에서 답을 찾아보세요",
  openGraph: {
    title: `FitFor`,
    description: `나만의 스타일, 모두의 코디! 어떻게 입을지 고민될 땐 핏포에서 답을 찾아보세요`,
    url: `https://fit4.vercel.app`,
    images: {
      url: "https://fit4.vercel.app/images/fitfor-og-image.png"
    }
  }
};

export default function RootLayout({
  children,
  modal,
  detailModal
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
  detailModal: ReactNode;
}>) {
  return (
    <html lang="ko" className="min-h-full">
      <AuthProvider>
        <TQProviders>
          <body className={`${pretendard.className} relative text-body text-text-04`}>
            <MinTablet>
              <Header />
            </MinTablet>
            <main className="relative mx-auto w-full max-w-[1200px] pt-20 tb:pb-[77px] tb:pt-0">
              {children}
              {modal}
              <ModalProvider>{detailModal}</ModalProvider>
            </main>
            <Tablet>
              <NavBar />
            </Tablet>
            <Toast />
          </body>
        </TQProviders>
      </AuthProvider>
    </html>
  );
}
