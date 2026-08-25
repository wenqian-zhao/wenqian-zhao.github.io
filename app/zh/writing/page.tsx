import type { Metadata } from "next";
import { SiteFrame } from "../../components/SiteFrame";
import { writings } from "../../generated-writings";
import { chineseWritingMeta } from "../writing-meta";

export const metadata: Metadata = { title: "文章 — 赵文茜", description: "赵文茜关于 AI、品味、工作与生活的随笔。", openGraph: { title: "文章 — 赵文茜", description: "一个停不下来的大脑留下的笔记。", images: [] }, twitter: { card: "summary", title: "文章 — 赵文茜", description: "一个停不下来的大脑留下的笔记。", images: [] } };
export default function ChineseWritingPage() { return <SiteFrame active="WRITING" locale="zh"><section className="pageIntro"><p className="eyebrow">04 / 随笔</p><h1>会反过来<br /><em>与你对话的想法。</em></h1><p>关于 AI、品味、工作与生活的笔记，现在无需离开这个网站就能阅读。</p></section><section className="articleSection"><div className="articleHead"><span>编号</span><span>文章</span><span>分类 / 日期</span><span>打开</span></div>{writings.map((writing, index) => { const zh = chineseWritingMeta[writing.slug]; return <a className="articleRow" href={`/zh/writing/${writing.slug}/`} key={writing.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{writing.title}</h2><p>{zh.description}</p></div><span>{zh.category}<br />{writing.date}</span><span>→</span></a>; })}<a className="archiveButton" href="https://wenqianzhao.wordpress.com/" target="_blank" rel="noreferrer">原 WORDPRESS 网站 <span>↗</span></a></section></SiteFrame>; }
