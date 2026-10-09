"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { SiteHeader } from "./SiteHeader";

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function WikiShell({ sidebar, footer, children }: { sidebar: ReactNode; footer: ReactNode; children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(true);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const update = () => {
      setIsMobile(media.matches);
      if (!media.matches) setSidebarOpen(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile || !sidebarOpen) return;
    const targets = [document.querySelector<HTMLElement>(".site-header"), stageRef.current, document.querySelector<HTMLElement>(".site-footer"), document.querySelector<HTMLElement>(".skip-link")]
      .filter((element): element is HTMLElement => !!element);
    const priorInert = targets.map((element) => ({ element, inert: element.inert }));
    const priorOverflow = document.body.style.overflow;
    targets.forEach((element) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => closeRef.current?.focus());
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); setSidebarOpen(false); }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      priorInert.forEach(({ element, inert }) => { element.inert = inert; });
      document.body.style.overflow = priorOverflow;
      if (restoreFocusRef.current) requestAnimationFrame(() => openerRef.current?.focus());
      restoreFocusRef.current = true;
    };
  }, [isMobile, sidebarOpen]);

  function toggleSidebar() {
    if (!sidebarOpen) {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      restoreFocusRef.current = true;
    }
    setSidebarOpen((value) => !value);
  }

  function onSidebarKey(event: ReactKeyboardEvent<HTMLElement>) {
    if (!isMobile || !sidebarOpen || event.key !== "Tab" || !sidebarRef.current) return;
    const focusable = Array.from(sidebarRef.current.querySelectorAll<HTMLElement>(focusableSelector))
      .filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    const current = document.activeElement;
    if (event.shiftKey && (current === first || !sidebarRef.current.contains(current))) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (current === last || !sidebarRef.current.contains(current))) { event.preventDefault(); first.focus(); }
  }

  return <>
    <SiteHeader sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} onCloseSidebar={() => setSidebarOpen(false)} />
    <div className="wiki-shell">
      {sidebarOpen && isMobile && <button className="wiki-sidebar-backdrop" type="button" tabIndex={-1} aria-hidden="true" onClick={() => setSidebarOpen(false)} />}
      <aside ref={sidebarRef} className={`wiki-sidebar${sidebarOpen ? " is-open" : ""}`} id="wiki-sidebar" role={isMobile && sidebarOpen ? "dialog" : undefined} aria-modal={isMobile && sidebarOpen ? true : undefined} aria-label="문서 탐색기" inert={isMobile && !sidebarOpen} onKeyDown={onSidebarKey} onClick={(event) => { if ((event.target as HTMLElement).closest("a")) { restoreFocusRef.current = false; setSidebarOpen(false); } }}>
        <button ref={closeRef} className="wiki-sidebar-close" type="button" onClick={() => setSidebarOpen(false)}><X size={16} aria-hidden="true" /> 닫기</button>
        {sidebar}
      </aside>
      <div ref={stageRef} className="wiki-stage" id="main-content">{children}</div>
    </div>
    {footer}
  </>;
}
