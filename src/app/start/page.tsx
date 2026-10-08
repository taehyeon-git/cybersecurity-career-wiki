import type { Metadata } from "next";
import Link from "next/link";
import { WikiFileRow, WikiFolder } from "@/components/wiki/Directory";

export const metadata: Metadata = { title: "처음 시작하기", description: "사이버보안 분야의 전체 구조와 직무 탐색 방법을 처음부터 안내합니다.", alternates: { canonical: "/start/" } };

export default function StartPage() {
  return <main className="wiki-page wiki-start">
    <header className="wiki-page-header">
      <div className="wiki-page-kicker">위키 / 안내</div>
      <h1 className="wiki-page-title">처음 시작하기</h1>
      <p className="wiki-page-intro">보안 분야가 낯설다면 여기서 시작하세요. 분야의 큰 그림을 잡은 다음, 폴더를 펼쳐 관심 있는 직무와 기술을 따라가면 됩니다.</p>
      <div className="wiki-page-meta"><span>입문 안내</span><span>예상 읽기 시간 5분</span><Link href="/careers/">직무 문서 바로 보기</Link></div>
    </header>

    <section className="wiki-start-section">
      <h2>사이버보안은 무엇을 지키나요?</h2>
      <p>사이버보안은 조직의 시스템·네트워크·서비스·데이터가 신뢰할 수 있게 운영되도록 위험을 파악하고 줄이는 일입니다. 정보보안은 보호 대상인 정보의 기밀성·무결성·가용성에 초점을 두며, 두 용어는 맥락에 따라 겹쳐 쓰입니다.</p>
      <div className="wiki-start-definition"><strong>기억할 세 가지 관점</strong><ul><li><b>예방과 설계</b> — 제품과 인프라에 안전한 기본값과 통제를 설계합니다.</li><li><b>탐지와 대응</b> — 이상 징후를 찾아 사건인지 판단하고 영향을 줄입니다.</li><li><b>위험과 보증</b> — 위험을 평가하고 정책과 통제가 작동하는지 확인합니다.</li></ul></div>
    </section>

    <section className="wiki-start-section">
      <h2>직무와 기술, 두 개의 지도로 읽기</h2>
      <p>직무는 조직에서 어떤 문제를 맡고 어떤 결과를 책임지는지를 설명합니다. SOC 분석가는 경보를 분류하고 대응팀에 근거를 전달하는 식입니다. 기술은 여러 직무가 공유하는 개념과 방법입니다. 로그 분석은 SOC 분석가뿐 아니라 탐지 엔지니어와 침해사고 대응자도 사용합니다.</p>
      <p className="wiki-index-note">이 위키의 다섯 직무 폴더는 독자를 위한 편집 구조입니다. NIST NICE의 공식 Work Role Categories와 같은 분류라고 주장하지 않습니다.</p>
    </section>

    <section className="wiki-start-section">
      <div className="wiki-section-heading"><span>읽는 순서</span><h2>이 네 문서부터 시작하세요</h2><p>기초 개념을 읽고 관심 직무를 고른 뒤, 비교와 실습으로 좁혀 갑니다.</p></div>
      <div className="wiki-folder-list"><WikiFolder name="입문 경로" description="위에서 아래로 읽는 순서" count="4개 문서" defaultOpen>
        <WikiFileRow href="/knowledge/cybersecurity-fundamentals/" title="01. 기초 언어 익히기" description="자산, 위협, 취약점, 위험의 차이를 이해합니다." />
        <WikiFileRow href="/careers/" title="02. 관심 직무 고르기" description="업무 목적과 대표 산출물이 나와 맞는지 살펴봅니다." />
        <WikiFileRow href="/comparisons/" title="03. 가까운 직무 비교하기" description="같은 기술을 쓰는 두 직무의 책임 차이를 확인합니다." />
        <WikiFileRow href="/roadmaps/" title="04. 학습과 실습 연결하기" description="로드맵의 완료 기준에 맞춰 작은 결과물을 만듭니다." />
      </WikiFolder></div>
    </section>

    <section className="wiki-start-section">
      <div className="wiki-section-heading"><span>전체 목차</span><h2>다른 폴더도 둘러보기</h2></div>
      <div className="wiki-folder-list"><WikiFolder name="위키 찾아보기" description="현재 목적에 맞는 목차로 이동" count="4개 항목">
        <WikiFileRow href="/knowledge/" title="기술 지식" description="보안 업무에 쓰이는 개념과 기술을 분야별로 정리했습니다." />
        <WikiFileRow href="/knowledge-map/" title="직무 지식 지도" description="직무와 기술, 관련 직무, 로드맵의 연결을 따라갑니다." />
        <WikiFileRow href="/glossary/" title="보안 용어 사전" description="낯선 한국어·영어 용어를 짧게 찾아봅니다." />
        <WikiFileRow href="/roadmaps/" title="학습 로드맵" description="기초와 직무별 학습 단계를 확인합니다." />
      </WikiFolder></div>
    </section>
  </main>;
}
