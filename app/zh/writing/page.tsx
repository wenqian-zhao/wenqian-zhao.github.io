import type { Metadata } from "next";
import { SiteFrame } from "../../components/SiteFrame";
import { writings } from "../../generated-writings";
import { chineseWritingMeta } from "../writing-meta";

export const metadata: Metadata = { title: "文章 — 赵文茜", description: "关于 AI、品味、工作和生活，还有一些暂时没想明白的事。", openGraph: { title: "文章 — 赵文茜", description: "一些还没想完的事。", images: [] }, twitter: { card: "summary", title: "文章 — 赵文茜", description: "一些还没想完的事。", images: [] } };
export default function ChineseWritingPage() { return <SiteFrame active="WRITING" locale="zh"><section className="pageIntro"><p className="eyebrow">04 / 随笔</p><h1>一些<br /><em>还没想完的事。</em></h1><p>写 AI，也写品味、工作和生活。这里没有结论集锦，更多是思考发生过的痕迹。</p></section><section className="articleSection"><div className="articleHead"><span>编号</span><span>文章</span><span>分类 / 日期</span><span>打开</span></div>{writings.map((writing, index) => { const zh = chineseWritingMeta[writing.slug]; return <a className="articleRow" href={`/zh/writing/${writing.slug}/`} key={writing.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{writing.title}</h2><p>{zh.description}</p></div><span>{zh.category}<br />{writing.date}</span><span>→</span></a>; })}<a className="archiveButton" href="https://wenqianzhao.wordpress.com/" target="_blank" rel="noreferrer">回到最初的 WORDPRESS <span>↗</span></a></section></SiteFrame>; }
