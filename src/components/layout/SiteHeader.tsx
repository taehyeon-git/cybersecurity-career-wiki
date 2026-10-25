"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, FolderTree, X } from "lucide-react";
import { mainNav } from "@/lib/site-data";
import { SearchDialog } from "@/components/search/SearchDialog";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader({ sidebarOpen, onToggleSidebar, onCloseSidebar }: { sidebarOpen: boolean; onToggleSidebar: () => void; onCloseSidebar: () => void }) {
  const path = usePathname();
  return <header className="site-header">
    <div className="wiki-header-line"><span>CYBERSECURITY CAREER WIKI</span><span>한국어 보안 직무 문서 아카이브</span></div>
    <div className="header-inner">
      <Link className="brand" href="/" onClick={onCloseSidebar} aria-label="Cybersecurity Career Wiki 홈"><span className="brand-mark"><BookOpenText size={21} strokeWidth={2.1} /></span><span className="brand-name"><span className="brand-prefix">Cybersecurity </span><span>Career Wiki</span></span></Link>
      <nav className="desktop-nav" aria-label="주 탐색">{mainNav.map((item) => {
        const sectionPath = item.href.replace(/\/$/, "");
        const currentPage = path.replace(/\/$/, "") === sectionPath;
        const currentSection = currentPage || path.startsWith(`${sectionPath}/`);
        return <Link key={item.href} className={currentSection ? "active" : ""} href={item.href} aria-current={currentPage ? "page" : currentSection ? "location" : undefined}>{item.label}</Link>;
      })}</nav>
      <div className="header-actions"><SearchDialog /><ThemeToggle /><button className="icon-button menu-button" type="button" onClick={onToggleSidebar} aria-expanded={sidebarOpen} aria-controls="wiki-sidebar" aria-label={sidebarOpen ? "문서 탐색기 닫기" : "문서 탐색기 열기"}>{sidebarOpen ? <X size={20} /> : <FolderTree size={20} />}</button></div>
    </div>
  </header>;
}
