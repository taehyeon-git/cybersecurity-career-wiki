"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronDown, Compass, FileText, Folder, FolderOpen, House } from "lucide-react";
import { Fragment, useEffect, useId, useState } from "react";

export type WikiPageNode = {
  kind: "page";
  key: string;
  label: string;
  href: string;
};

export type WikiFolderNode = {
  kind: "folder";
  key: string;
  label: string;
  count: number;
  children: WikiTreeNode[];
};

export type WikiTreeNode = WikiPageNode | WikiFolderNode;

function normalizedPath(path: string): string {
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  const withoutBasePath = basePath && (path === basePath || path.startsWith(`${basePath}/`))
    ? path.slice(basePath.length)
    : path;
  const clean = withoutBasePath.split(/[?#]/, 1)[0] || "/";
  return clean === "/" ? "/" : `${clean.replace(/\/$/, "")}/`;
}

function containsPath(node: WikiTreeNode, pathname: string): boolean {
  if (node.kind === "page") return normalizedPath(node.href) === pathname;
  return node.children.some((child) => containsPath(child, pathname));
}

function PageLink({ node, pathname, depth }: { node: WikiPageNode; pathname: string; depth: number }) {
  const active = normalizedPath(node.href) === pathname;
  const Icon = node.key === "home" ? House : node.key === "start" ? Compass : node.key === "glossary" ? BookOpen : FileText;
  return <li className={`wiki-tree-item wiki-tree-page${active ? " is-current" : ""}`} data-depth={depth}>
    <Link className="wiki-tree-link" href={node.href} aria-current={active ? "page" : undefined}>
      <span className="wiki-tree-icon-frame" aria-hidden="true"><Icon className="wiki-tree-link-icon" size={16} /></span>
      <span className="wiki-tree-label">{node.label}</span>
    </Link>
  </li>;
}

function FolderBranch({ node, pathname, depth }: { node: WikiFolderNode; pathname: string; depth: number }) {
  const [open, setOpen] = useState(() => containsPath(node, pathname));
  const childId = useId();
  const currentBranch = containsPath(node, pathname);
  useEffect(() => {
    if (!currentBranch) return;
    const frame = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(frame);
  }, [pathname, currentBranch]);
  return <li className={`wiki-tree-item wiki-tree-folder${open ? " is-open" : ""}${currentBranch ? " is-active" : ""}`} data-depth={depth}>
    <button
      type="button"
      className="wiki-tree-folder-toggle"
      aria-expanded={open}
      aria-controls={childId}
      onClick={() => setOpen((wasOpen) => !wasOpen)}
    >
      <span className="wiki-tree-icon-frame" aria-hidden="true">
        {open
          ? <FolderOpen className="wiki-tree-folder-icon" size={17} />
          : <Folder className="wiki-tree-folder-icon" size={17} />}
      </span>
      <span className="wiki-tree-label">{node.label}</span>
      <span className="wiki-tree-count" aria-label={`${node.count}개 문서`}>{node.count}</span>
      <ChevronDown className="wiki-tree-caret" size={14} aria-hidden="true" />
    </button>
    <ul id={childId} className="wiki-tree-list wiki-tree-children" data-depth={depth + 1} hidden={!open}>
      {node.children.map((child) => <TreeNode key={child.key} node={child} pathname={pathname} depth={depth + 1} />)}
    </ul>
  </li>;
}

function TreeNode({ node, pathname, depth }: { node: WikiTreeNode; pathname: string; depth: number }) {
  return node.kind === "folder"
    ? <FolderBranch node={node} pathname={pathname} depth={depth} />
    : <PageLink node={node} pathname={pathname} depth={depth} />;
}

function TreeView({ nodes, pathname }: { nodes: WikiTreeNode[]; pathname: string }) {
  return <nav className="wiki-tree" aria-label="위키 폴더 탐색">
    <div className="wiki-tree-heading">
      <div className="wiki-tree-heading-meta"><span>THE DIRECTORY</span><span>INDEX / {String(nodes.length).padStart(2, "0")}</span></div>
      <strong>Explore <em>the wiki.</em></strong>
      <p>보안의 분야와 커리어를 찾아보세요.</p>
    </div>
    <ul className="wiki-tree-list wiki-tree-root" data-depth={0}>
      {nodes.map((node, index) => {
        const previous = nodes[index - 1];
        const section = index === 0 ? "START HERE" : node.kind !== previous?.kind ? node.kind === "folder" ? "EXPLORE" : "REFERENCE" : null;
        return <Fragment key={node.key}>
          {section && <li className="wiki-tree-section-label" role="presentation" aria-hidden="true"><span>{section}</span><i /></li>}
          <TreeNode node={node} pathname={pathname} depth={0} />
        </Fragment>;
      })}
    </ul>
  </nav>;
}

export function WikiFolderNavigation({ nodes }: { nodes: WikiTreeNode[] }) {
  const pathname = normalizedPath(usePathname() ?? "/");
  return <TreeView nodes={nodes} pathname={pathname} />;
}
