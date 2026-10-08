import Link from "next/link";
import { BookOpenText, Github, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  const repository = process.env.NEXT_PUBLIC_REPOSITORY_URL;
  return <footer className="site-footer"><div className="footer-inner"><div><div className="footer-brand"><BookOpenText size={20} /> Cybersecurity Career Wiki</div><p>직무, 기술, 학습을 하나의 지식 지도로 연결합니다.<br />공식 자료에 근거한 공개 교육용 위키입니다.</p></div><div className="footer-links"><Link href="/start/">처음 시작하기</Link><Link href="/careers/">직무 탐색</Link><Link href="/knowledge/">기술 지식</Link><Link href="/knowledge-map/">지식 지도</Link></div><div className="footer-links"><Link href="/roadmaps/">로드맵</Link><Link href="/comparisons/">직무 비교</Link><Link href="/glossary/">용어 사전</Link>{repository && <a href={repository} target="_blank" rel="noopener noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a>}</div></div><div className="footer-bottom">© {new Date().getFullYear()} Cybersecurity Career Wiki · 자체 콘텐츠는 CC BY 4.0, 코드는 MIT · 외부 자료는 각 원저작자의 권리를 따릅니다.</div></footer>;
}
