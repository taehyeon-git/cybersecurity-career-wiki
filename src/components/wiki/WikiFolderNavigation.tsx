"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Folder, FolderOpen } from "lucide-react";
import { useId, useState } from "react";

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

function PageLink({ node, pathname }: { node: WikiPageNode; pathname: string }) {
  const active = normalizedPath(node.href) === pathname;
  return <li className={`wiki-tree-item wiki-tree-page${active ? " is-current" : ""}`}>
    <Link className="wiki-tree-link" href={node.href} aria-current={active ? "page" : undefined}>
      <FileText className="wiki-tree-link-icon" size={15} aria-hidden="true" />
      <span className="wiki-tree-label">{node.label}</span>
    </Link>
  </li>;
}

function FolderBranch({ node, pathname, depth }: { node: WikiFolderNode; pathname: string; depth: number }) {
  const [open, setOpen] = useState(() => containsPath(node, pathname));
  const childId = useId();
  const currentBranch = containsPath(node, pathname);
  return <li className={`wiki-tree-item wiki-tree-folder${open ? " is-open" : ""}${currentBranch ? " is-active" : ""}`}>
    <button
      type="button"
      className="wiki-tree-folder-toggle"
      aria-expanded={open}
      aria-controls={childId}
      onClick={() => setOpen((wasOpen) => !wasOpen)}
    >
      <span className="wiki-tree-caret" aria-hidden="true">{open ? "−" : "+"}</span>
      {open
        ? <FolderOpen className="wiki-tree-folder-icon" size={16} aria-hidden="true" />
        : <Folder className="wiki-tree-folder-icon" size={16} aria-hidden="true" />}
      <span className="wiki-tree-label">{node.label}</span>
      <span className="wiki-tree-count" aria-label={`${node.count}개 문서`}>{node.count}</span>
    </button>
    <ul id={childId} className="wiki-tree-list wiki-tree-children" data-depth={depth + 1} hidden={!open}>
      {node.children.map((child) => <TreeNode key={child.key} node={child} pathname={pathname} depth={depth + 1} />)}
    </ul>
  </li>;
}

function TreeNode({ node, pathname, depth }: { node: WikiTreeNode; pathname: string; depth: number }) {
  return node.kind === "folder"
    ? <FolderBranch node={node} pathname={pathname} depth={depth} />
    : <PageLink node={node} pathname={pathname} />;
}

function TreeView({ nodes, pathname }: { nodes: WikiTreeNode[]; pathname: string }) {
  return <nav className="wiki-tree" aria-label="위키 폴더 탐색">
    <div className="wiki-tree-heading"><strong>문서 탐색기</strong><span>INDEX</span></div>
    <ul className="wiki-tree-list wiki-tree-root" data-depth={0}>
      {nodes.map((node) => <TreeNode key={node.key} node={node} pathname={pathname} depth={0} />)}
    </ul>
  </nav>;
}

export function WikiFolderNavigation({ nodes }: { nodes: WikiTreeNode[] }) {
  const pathname = normalizedPath(usePathname() ?? "/");
  // Remount the tree when navigating so the selected document's ancestors open.
  return <TreeView key={pathname} nodes={nodes} pathname={pathname} />;
}
