"use client";

import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { SiteHeader } from "./SiteHeader";

export function WikiShell({ sidebar, footer, children }: { sidebar: ReactNode; footer: ReactNode; children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return <>
    <SiteHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((open) => !open)} onCloseSidebar={() => setSidebarOpen(false)} />
    <div className="wiki-shell">
      {sidebarOpen && <button className="wiki-sidebar-backdrop" type="button" aria-label="문서 탐색기 닫기" onClick={() => setSidebarOpen(false)} />}
      <aside className={`wiki-sidebar${sidebarOpen ? " is-open" : ""}`} id="wiki-sidebar" aria-label="문서 탐색기" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setSidebarOpen(false); }}>
        <button className="wiki-sidebar-close" type="button" onClick={() => setSidebarOpen(false)}><X size={16} aria-hidden="true" /> 닫기</button>
        {sidebar}
      </aside>
      <div className="wiki-stage" id="main-content">{children}</div>
    </div>
    {footer}
  </>;
}
