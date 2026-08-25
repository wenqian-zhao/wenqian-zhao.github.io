import type { Metadata } from "next";
import Link from "next/link";
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
    return <SiteFrame active="WRITING"><section className="readerMissing"><p>THIS NOTE DOES NOT EXIST.</p><Link href="/writing/">BACK TO WRITING ←</Link></section></SiteFrame>;
  }
  return (
    <SiteFrame active="WRITING" alternateHref={`/zh/writing/${writing.slug}/`}>
      <article className="reader">
        <header className="readerHeader">
          <Link href="/writing/">← ALL WRITINGS</Link>
          <p>{writing.category} · {writing.date} · {writing.readingTime} MIN READ</p>
          <h1>{writing.title}</h1>
          <p className="readerDek">{writing.description}</p>
        </header>
        <div className="markdownBody" dangerouslySetInnerHTML={{ __html: writing.html }} />
      </article>
    </SiteFrame>
  );
}
