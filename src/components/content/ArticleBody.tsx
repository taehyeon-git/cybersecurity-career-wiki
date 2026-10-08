import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { headingId } from "@/lib/content";
import type { ReactNode } from "react";

function headingText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(headingText).join("");
  return "";
}

export function ArticleBody({ body }: { body: string }) {
  return <div className="article-prose"><MDXRemote source={body} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={{
    h2: ({ children }) => <h2 id={headingId(headingText(children))}>{children}</h2>,
    h3: ({ children }) => <h3 id={headingId(headingText(children))}>{children}</h3>,
    a: ({ href, children }) => href?.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
  }} /></div>;
}
