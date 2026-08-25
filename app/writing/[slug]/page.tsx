import type { Metadata } from "next";
import { SiteFrame } from "../../components/SiteFrame";
import { findWriting, writings } from "../../generated-writings";

type WritingPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return writings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const writing = findWriting((await params).slug);
  if (!writing) return { title: "Writing not found — Wenqian Zhao" };
  const title = `${writing.title} — Wenqian Zhao`;
  return {
    title,
    description: writing.description,
    openGraph: { title, description: writing.description, type: "article", images: [] },
    twitter: { card: "summary", title, description: writing.description, images: [] },
  };
}

export default async function WritingReaderPage({ params }: WritingPageProps) {
  const writing = findWriting((await params).slug);
  if (!writing) {
    return <SiteFrame active="WRITING"><section className="readerMissing"><p>THIS NOTE DOES NOT EXIST.</p><a href="/writing/">BACK TO WRITING ←</a></section></SiteFrame>;
  }
  return (
    <SiteFrame active="WRITING">
      <article className="reader">
        <header className="readerHeader">
          <a href="/writing/">← ALL WRITINGS</a>
          <p>{writing.category} · {writing.date} · {writing.readingTime} MIN READ</p>
          <h1>{writing.title}</h1>
          <p className="readerDek">{writing.description}</p>
        </header>
        <div className="markdownBody" dangerouslySetInnerHTML={{ __html: writing.html }} />
      </article>
    </SiteFrame>
  );
}
