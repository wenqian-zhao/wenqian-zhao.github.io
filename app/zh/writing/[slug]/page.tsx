import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "../../../components/SiteFrame";
import { findWriting, writings } from "../../../generated-writings";
import { chineseWritingMeta } from "../../writing-meta";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return writings.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const writing = findWriting((await params).slug); if (!writing) return { title: "文章不存在 — 赵文千" }; const zh = chineseWritingMeta[writing.slug]; const title = `${writing.title} — 赵文千`; return { title, description: zh.description, openGraph: { title, description: zh.description, type: "article", images: [] }, twitter: { card: "summary", title, description: zh.description, images: [] } }; }
export default async function ChineseWritingReaderPage({ params }: Props) { const writing = findWriting((await params).slug); if (!writing) return <SiteFrame active="WRITING" locale="zh"><section className="readerMissing"><p>这篇文章不存在。</p><Link href="/zh/writing/">返回文章列表 ←</Link></section></SiteFrame>; const zh = chineseWritingMeta[writing.slug]; return <SiteFrame active="WRITING" locale="zh" alternateHref={`/writing/${writing.slug}/`}><article className="reader"><header className="readerHeader"><Link href="/zh/writing/">← 所有文章</Link><p>{zh.category} · {writing.date} · 阅读约 {writing.readingTime} 分钟</p><h1>{writing.title}</h1><p className="readerDek">{zh.description}</p></header><div className="markdownBody" dangerouslySetInnerHTML={{ __html: writing.html }} /></article></SiteFrame>; }
