import type { Metadata } from "next";
import Link from "next/link";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";

export const metadata: Metadata = { title: "직무 찾는 방법", description: "보안 직무 위키의 업무 범주와 채용 근거를 읽는 방법을 안내합니다.", alternates: { canonical: "/start/" } };

export default function StartPage() {
  return <main className="wiki-page wiki-start">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 안내</div>
      <h1 className="wiki-page-title">직무 찾는 방법</h1>
      <p className="wiki-page-intro">보안 커리어를 고를 때는 직함보다 실제로 맡는 책임과 결과물을 먼저 보세요. 이 위키는 기술 강의 대신 직무와 진입 경로에 집중합니다.</p>
      <div className="wiki-page-meta"><span>입문 안내</span><Link href="/careers/">직무 전체 보기</Link></div>
    </header>

    <section className="wiki-start-section">
      <h2>업무 범주를 먼저 고르세요</h2>
      <p>직무 폴더는 국내 <a href="https://www.ncs.go.kr/sqf/sqf01/sqf10100201p1.do?iscCd=20&amp;iscNm=%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8" target="_blank" rel="noopener noreferrer">NCS 정보보호 SQF</a>의 실제 업무 분야를 바탕으로 구성했습니다. 전략·관리, 설계·개발, 구축·운영, 진단·평가, 관제·사고 대응, 기술영업·고객지원 폴더에서 관심 있는 일을 찾아보세요. 한 채용 공고가 여러 영역의 일을 합쳐 놓을 수도 있습니다.</p>
      <div className="wiki-start-definition"><strong>직무 글에서 볼 것</strong><ul><li><b>책임</b> — 어떤 결정을 내리고 어디까지 책임지는가</li><li><b>산출물</b> — 업무 결과를 누가 받아 어떤 결정을 하는가</li><li><b>채용 근거</b> — 어떤 공고에서 실제로 확인했으며 무엇이 미확인인가</li><li><b>진입 경로</b> — 지금 가진 경험으로 무엇을 보여줄 수 있는가</li></ul></div>
    </section>

    <section className="wiki-start-section">
      <h2>채용 사례는 이렇게 읽으세요</h2>
      <p>공고의 회사·직함·확인일·업무·요건을 함께 확인하세요. 공고는 수정되거나 마감될 수 있습니다. 한 회사의 특정 공고가 모든 회사의 필수 조건을 뜻하지는 않습니다. 직함만 확인된 공고는 업무나 신입 가능 여부의 근거로 사용하지 않습니다.</p>
      <p>자료의 기준과 한계는 <a href="https://github.com/taehyeon-git/cybersecurity-career-wiki/blob/main/docs/research/korean-job-market.md" target="_blank" rel="noopener noreferrer">국내 채용 공고 조사</a>에 공개되어 있습니다. 표본은 플랫폼·금융 기업에 치우쳐 있으므로 채용 수요나 연봉 추정에는 사용하지 마세요.</p>
    </section>

    <section className="wiki-start-section">
      <h2>이 순서로 읽으면 됩니다</h2>
      <div className="wiki-folder-list"><WikiFolder name="커리어 탐색 경로" description="직무를 고르고 지원 준비까지" count="3개 문서" defaultOpen>
        <WikiFileRow href="/careers/" title="01. 업무 범주에서 직무 찾기" description="맡는 일과 대표 산출물로 관심 직무를 좁힙니다." />
        <WikiFileRow href="/roadmaps/" title="02. 준비 경로 정하기" description="채용 공고와 포트폴리오를 연결해 지원 계획을 세웁니다." />
        <WikiFileRow href="/glossary/" title="03. 공고 용어 확인하기" description="낯선 약어만 짧게 확인하고 직무 글로 돌아옵니다." />
      </WikiFolder></div>
    </section>
  </main>;
}
