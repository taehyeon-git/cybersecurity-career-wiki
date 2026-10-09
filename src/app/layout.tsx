import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WikiShell } from "@/components/layout/WikiShell";
import { WikiFolderTree } from "@/components/wiki/WikiFolderTree";
import "./globals.css";
import "./wiki.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Cybersecurity Career Wiki | 보안 직무 커리어", template: "%s | Cybersecurity Career Wiki" },
  description: "사이버보안 직무의 실제 업무, 산출물, 채용 사례와 커리어 준비 경로를 정리한 한국어 위키입니다.",
  openGraph: { title: "Cybersecurity Career Wiki", description: "보안 직무와 커리어 준비를 위한 한국어 공개 위키", type: "website", locale: "ko_KR" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><a className="skip-link" href="#main-content">본문으로 건너뛰기</a><WikiShell sidebar={<WikiFolderTree />} footer={<SiteFooter />}>{children}</WikiShell></body></html>;
}
