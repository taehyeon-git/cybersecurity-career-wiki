import Link from "next/link";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";

export default function NotFound() {
  return <main className="wiki-page wiki-not-found">
    <nav className="wiki-home-breadcrumb" aria-label="현재 위치"><Link href="/">위키</Link><span>›</span><strong>문서 없음</strong></nav>
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">404 / DOCUMENT NOT FOUND</div>
      <h1 className="wiki-page-title">문서를 찾지 못했습니다</h1>
      <p className="wiki-page-intro">이 문서는 삭제되었거나 주소가 바뀌었습니다. 아래에서 공개 중인 직무와 커리어 경로를 찾아보세요.</p>
    </header>
    <div className="wiki-folder-list"><WikiFolder name="다시 찾아보기" description="공개된 문서 색인" count="4개 경로" defaultOpen>
      <WikiFileRow href="/" title="위키 홈" description="모든 폴더를 한눈에 봅니다." />
      <WikiFileRow href="/careers/" title="보안 직무" description="일과 산출물 기준으로 찾습니다." />
      <WikiFileRow href="/roadmaps/" title="커리어 경로" description="직무 선택과 지원 준비를 살펴봅니다." />
      <WikiFileRow href="/glossary/" title="보안 용어집" description="낯선 명칭과 약어를 찾아봅니다." />
    </WikiFolder></div>
  </main>;
}
