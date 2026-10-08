import Link from "next/link";
import { ArrowRight, ChevronRight, FileText, Folder, FolderOpen } from "lucide-react";
import type { ReactNode } from "react";

export function WikiFolder({ name, description, count, children, defaultOpen = false }: {
  name: string;
  description?: string;
  count?: number | string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return <details className="wiki-folder" open={defaultOpen}>
    <summary className="wiki-folder-summary">
      <span className="wiki-folder-icon" aria-hidden="true"><Folder className="wiki-icon-closed" size={20} /><FolderOpen className="wiki-icon-open" size={20} /></span>
      <span className="wiki-folder-heading"><strong className="wiki-folder-name">{name}</strong>{description && <small className="wiki-folder-description">{description}</small>}</span>
      {count !== undefined && <span className="wiki-folder-count">{count}</span>}
      <ChevronRight className="wiki-folder-chevron" size={16} aria-hidden="true" />
    </summary>
    <div className="wiki-file-list">{children}</div>
  </details>;
}

export function WikiFileRow({ href, title, subtitle, description, meta }: {
  href: string;
  title: string;
  subtitle?: string;
  description?: string;
  meta?: string;
}) {
  return <Link className="wiki-file" href={href}>
    <FileText className="wiki-file-icon" size={17} aria-hidden="true" />
    <span className="wiki-file-main"><span className="wiki-file-title">{title}</span>{subtitle && <span className="wiki-file-subtitle">{subtitle}</span>}{description && <span className="wiki-file-description">{description}</span>}</span>
    {meta && <span className="wiki-file-meta">{meta}</span>}
    <ArrowRight className="wiki-file-arrow" size={15} aria-hidden="true" />
  </Link>;
}
