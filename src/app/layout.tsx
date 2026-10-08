import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WikiShell } from "@/components/layout/WikiShell";
import { WikiFolderTree } from "@/components/wiki/WikiFolderTree";
import "./globals.css";
import "./wiki.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Cybersecurity Career Wiki | 보안 직무와 기술의 연결 지도", template: "%s | Cybersecurity Career Wiki" },
  description: "사이버보안 직무부터 기술과 학습 로드맵까지, 복잡한 보안 분야를 하나의 지식 지도로 연결합니다.",
  openGraph: { title: "Cybersecurity Career Wiki", description: "보안 직무·기술·학습을 연결하는 한국어 공개 위키", type: "website", locale: "ko_KR" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><a className="skip-link" href="#main-content">본문으로 건너뛰기</a><WikiShell sidebar={<WikiFolderTree />} footer={<SiteFooter />}>{children}</WikiShell></body></html>;
}
