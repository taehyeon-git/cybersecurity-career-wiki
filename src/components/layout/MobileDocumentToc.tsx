import { ListTree } from "lucide-react";

type TocItem = { id: string; title: string };

export function MobileDocumentToc({ items, related = false }: { items: TocItem[]; related?: boolean }) {
  return <details className="mobile-document-toc">
    <summary><ListTree size={17} aria-hidden="true" /> 이 문서의 목차 <span>{items.length + 1 + Number(related)}개 항목</span></summary>
    <nav aria-label="이 문서의 목차">
      {items.map((item) => <a href={`#${item.id}`} key={item.id}>{item.title}</a>)}
      <a href="#references">참고자료</a>
      {related && <a href="#related-documents">관련 문서</a>}
    </nav>
  </details>;
}
