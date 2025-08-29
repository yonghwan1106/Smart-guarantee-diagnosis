import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "스마트 보증진단 | AI 기반 보증 승인 예측 서비스",
  description: "3분 만에 AI가 분석하는 신용보증재단 보증 승인 가능성. 15개 업종별 맞춤 분석과 개선방안을 제공합니다.",
  keywords: ["보증진단", "신용보증", "AI분석", "승인예측", "소상공인", "창업자금"],
  authors: [{ name: "스마트 보증진단" }],
  openGraph: {
    title: "스마트 보증진단 | AI 기반 보증 승인 예측",
    description: "3분 만에 보증 승인 가능성을 확인하세요",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
