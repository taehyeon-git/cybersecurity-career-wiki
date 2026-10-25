import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLinkCue } from "@/components/content/ExternalLinkCue";
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
      <h2>이 순서로 읽으면 됩니다</h2>
      <div className="wiki-folder-list"><WikiFolder name="첫 탐색 순서" description="분야·직무·입문 경로·용어집" count="4단계" defaultOpen>
        <WikiFileRow href="/fields/" title="01. 보안 분야 살펴보기" description="각 분야의 목적과 실제 하루를 읽고 관심 있는 일을 찾습니다." />
        <WikiFileRow href="/careers/" title="02. 분야 안에서 직무 찾기" description="맡는 책임과 대표 산출물로 관심 직무를 좁힙니다." />
        <WikiFileRow href="/roadmaps/cybersecurity-fundamentals/" title="03. 입문 경로 읽기" description="채용 공고와 포트폴리오를 연결해 첫 지원 계획을 세웁니다." />
        <WikiFileRow href="/glossary/" title="04. 공고 용어 확인하기" description="낯선 약어만 짧게 확인하고 직무 글로 돌아옵니다." />
      </WikiFolder></div>
    </section>

    <section className="wiki-start-section">
      <h2>분야를 읽고 직무를 고르세요</h2>
      <p><Link href="/fields/">분야 안내</Link>는 큰 업무의 목적과 실제 하루, 세부 갈래, 관련 직무를 설명합니다. 그다음 직무 글에서 한 사람의 책임과 산출물, 채용 근거를 확인하세요. 이 위키의 분야 폴더는 국내 <a href="https://www.ncs.go.kr/sqf/sqf01/sqf10100201p1.do?iscCd=20&amp;iscNm=%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8" target="_blank" rel="noopener noreferrer">NCS 정보보호 SQF<ExternalLinkCue /></a>를 참고해 실제 역할을 찾기 쉽게 재구성한 것이며 공식 하위산업 분야와 같은 목록은 아닙니다. 조직마다 직함이 다르고 한 공고가 여러 분야의 일을 합칠 수 있으므로 폴더명과 함께 각 글의 책임을 확인하세요.</p>
      <div className="wiki-start-definition"><h3>직무 글에서 볼 것</h3><ul><li><b>책임</b> — 어떤 결정을 내리고 어디까지 책임지는가</li><li><b>산출물</b> — 업무 결과를 누가 받아 어떤 결정을 하는가</li><li><b>채용 근거</b> — 어떤 공고에서 실제로 확인했으며 무엇이 미확인인가</li><li><b>진입 경로</b> — 지금 가진 경험으로 무엇을 보여줄 수 있는가</li></ul></div>
    </section>

    <section className="wiki-start-section">
      <h2>채용 사례는 이렇게 읽으세요</h2>
      <p>공고의 회사·직함·확인일·업무·요건을 함께 확인하세요. 공고는 수정되거나 마감될 수 있습니다. 한 회사의 특정 공고가 모든 회사의 필수 조건을 뜻하지는 않습니다. 직함만 확인된 공고는 업무나 신입 가능 여부의 근거로 사용하지 않습니다.</p>
      <div className="wiki-start-definition"><h3>지원할 공고에서 확인할 다섯 가지</h3><ol><li><b>주 업무:</b> 제목보다 본문의 반복 업무와 담당 시스템·고객을 확인합니다.</li><li><b>결과물과 결정권:</b> 보고서·설계·운영 기준 중 무엇을 만들고 누가 최종 승인하는지 봅니다.</li><li><b>필수와 우대:</b> 경력·학력·자격증·도구 경험이 어느 칸에 있는지 나눕니다.</li><li><b>근무 조건:</b> 정규직·계약직, 교대·당직, 출장, 근무지를 원문에서 찾고 빈칸은 미확인으로 둡니다.</li><li><b>접수 상태:</b> 게시·마감일과 지원 버튼을 다시 확인하고, 상충하는 표기는 채용팀에 묻습니다.</li></ol><p>최종 제안을 받으면 기본급과 변동급, 해당하는 야간·휴일·대기 수당의 지급 기준을 제안서에서 확인하세요. 교대 주기, 온콜 빈도와 보상, 고객사 상주·출장 여부는 채용팀에 묻고 답변을 기록하세요.</p></div>
      <p>직무 글의 ‘근거·범위 검토 중’ 표시는 편집 상태입니다. 그 직무가 없거나 글의 모든 근거가 미확인이라는 뜻은 아닙니다. 본문의 직접 공고, 인접 사례, 아직 확인하지 못한 조건을 구분해 읽으세요.</p>
      <p>자료의 기준과 한계는 <a href="https://github.com/taehyeon-git/cybersecurity-career-wiki/blob/main/docs/research/korean-job-market.md" target="_blank" rel="noopener noreferrer">국내 채용 공고 조사<ExternalLinkCue /></a>에 공개되어 있습니다. 표본은 플랫폼·금융 기업에 치우쳐 있으므로 채용 수요나 연봉 추정에는 사용하지 마세요. 직무별 평균 연봉을 싣지 않은 이유는 <a href="https://github.com/taehyeon-git/cybersecurity-career-wiki/blob/main/docs/research/compensation-source-review.md" target="_blank" rel="noopener noreferrer">급여 자료 검토<ExternalLinkCue /></a>에 정리했습니다.</p>
      <div className="wiki-start-definition">
        <h3>공식 표본조사와 개별 공고가 알려 주는 것</h3>
        <p><a href="https://www.msit.go.kr/bbs/view.do?sCode=user&amp;mId=99&amp;mPid=74&amp;bbsSeqNo=79&amp;nttSeqNo=3173676" target="_blank" rel="noopener noreferrer">2024 사이버보안 인력수급 실태조사<ExternalLinkCue /></a>는 종사자 50명 이상 민간기업 1,500개와 보안 관련 학과 재학생 1,000명을 조사했습니다. 보고서의 ‘부족한 직무’는 기업 인식에 대한 가중 추정·복수응답이지 현재 열린 공고 수가 아닙니다.</p>
        <p>지원할 자리의 업무·신입 가능 여부·고용형태·근무조건은 해당 공고 원문에서 확인하세요. 조사 결과나 이 위키의 공고 사례 수만으로 전체 채용 규모를 추정할 수 없습니다. <a href="https://github.com/taehyeon-git/cybersecurity-career-wiki/blob/main/docs/research/official-workforce-survey.md" target="_blank" rel="noopener noreferrer">조사 범위와 해석 한계 보기<ExternalLinkCue /></a></p>
      </div>
    </section>

  </main>;
}
