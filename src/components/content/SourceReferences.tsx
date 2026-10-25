import { ExternalLink } from "lucide-react";
import type { Source } from "@/lib/content";

export function SourceReferences({ ids, sources }: { ids: string[]; sources: Source[] }) {
  const items = ids.map((id) => sources.find((source) => source.id === id)).filter((item): item is Source => !!item);
  return <section className="source-section" id="references" aria-labelledby="source-heading"><div className="section-eyebrow">EVIDENCE</div><h2 id="source-heading">참고자료</h2><p>분야·직무·커리어 경로를 설명할 때 참고한 자료입니다. 공식 분류와 위키의 해설을 구분해 읽고, 실제 지원 조건은 해당 채용 공고에서 다시 확인하세요.</p><ol>{items.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer"><strong>{source.title}</strong><ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (새 탭에서 열림)</span></a><span>{source.organization}{source.version ? ` · ${source.version}` : ""} · 확인 {source.checkedAt}</span></li>)}</ol></section>;
}
