import type { Metadata } from "next";
import { SiteFrame } from "../components/SiteFrame";

export const metadata: Metadata = {
  title: "赵文茜 — 大模型数据工程师与写作者",
  description: "赵文茜从事大模型数据与算法工程，也写关于 AI、品味与生活的文章。",
  openGraph: { title: "赵文茜 — 大模型数据工程师与写作者", description: "数据、模型，以及围绕它们的问题。", images: [{ url: "/og.png" }] },
  twitter: { card: "summary_large_image", title: "赵文茜 — 大模型数据工程师与写作者", description: "数据、模型，以及围绕它们的问题。", images: ["/og.png"] },
};

const rooms = [
  { number: "01", title: "关于", note: "数据集背后的那个人。", href: "/zh/about/", tone: "violet", mark: "✳" },
  { number: "02", title: "经历", note: "从 Spokane 到大模型。", href: "/zh/experience/", tone: "peach", mark: "↳" },
  { number: "03", title: "项目", note: "模型、数据和有用的问题。", href: "/zh/work/", tone: "green", mark: "⌁" },
  { number: "04", title: "随笔", note: "关于 AI、品味与生活。", href: "/zh/writing/", tone: "blue", mark: "◎" },
];

export default function ChineseHome() {
  return (
    <SiteFrame active="HOME" locale="zh">
      <section className="homeHero">
        <p className="eyebrow"><i /> WENQIAN 在线 · 2026</p>
        <h1>我和<em>数据、模型，</em><br />以及它们周围的问题一起工作。</h1>
        <p className="homeIntro">大模型数据工程师 · 算法工程师 · 写作者</p>
        <a className="scrollCue" href="#explore">选择一扇门 <span>↓</span></a>
      </section>
      <section className="roomSection" id="explore">
        <div className="sectionRail"><span>探索</span><span>01 — 04</span></div>
        <div className="roomGrid">{rooms.map((room) => <a className={`roomCard ${room.tone}`} href={room.href} key={room.title}><div><span>{room.number}</span><span>打开 ↗</span></div><i aria-hidden="true">{room.mark}</i><h2>{room.title}</h2><p>{room.note}</p></a>)}</div>
      </section>
      <div className="ticker" aria-hidden="true"><div>语言模型 ✦ 数据质量 ✦ 产品品味 ✦ 音乐 ✦ 网球 ✦ 一级方程式 ✦ 语言模型 ✦ 数据质量 ✦ 产品品味 ✦</div></div>
    </SiteFrame>
  );
}
