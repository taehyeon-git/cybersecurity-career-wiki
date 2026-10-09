import Link from "next/link";
import { BookOpenText, Github, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  const repository = process.env.NEXT_PUBLIC_REPOSITORY_URL;
  return <footer className="site-footer"><div className="footer-inner"><div><div className="footer-brand"><BookOpenText size={20} /> Cybersecurity Career Wiki</div><p>보안 직무의 실제 일과 준비 경로를 정리합니다.<br />공식 직무 체계와 확인된 채용 사례를 구분해 제공합니다.</p></div><div className="footer-links"><Link href="/start/">처음 시작하기</Link><Link href="/careers/">보안 직무</Link></div><div className="footer-links"><Link href="/roadmaps/">커리어 경로</Link><Link href="/glossary/">용어집</Link>{repository && <a href={repository} target="_blank" rel="noopener noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a>}</div></div><div className="footer-bottom">© {new Date().getFullYear()} Cybersecurity Career Wiki · 자체 콘텐츠는 CC BY 4.0, 코드는 MIT · 외부 자료는 각 원저작자의 권리를 따릅니다.</div></footer>;
}
