import { ExternalLink } from "lucide-react";
import type { Source } from "@/lib/content";

export function SourceReferences({ ids, sources }: { ids: string[]; sources: Source[] }) {
  const items = ids.map((id) => sources.find((source) => source.id === id)).filter((item): item is Source => !!item);
  return <section className="source-section" id="references" aria-labelledby="source-heading"><div className="section-eyebrow">EVIDENCE</div><h2 id="source-heading">참고자료</h2><p>직무의 책임과 커리어 경로를 정리할 때 확인한 자료입니다. 위키의 해설과 공식 직무 분류·개별 채용 요건은 구분해 읽어 주세요.</p><ol>{items.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer"><strong>{source.title}</strong><ExternalLink size={15} /></a><span>{source.organization}{source.version ? ` · ${source.version}` : ""} · 확인 {source.checkedAt}</span></li>)}</ol></section>;
}
