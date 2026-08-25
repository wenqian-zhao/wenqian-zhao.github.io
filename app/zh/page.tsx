import type { Metadata } from "next";
import { SiteFrame } from "../components/SiteFrame";
import { PointerField } from "../components/PointerField";

export const metadata: Metadata = {
  title: "赵文千 — 大模型数据工程师与写作者",
  description: "赵文千做大模型数据与算法，也写 AI、品味和生活。",
  openGraph: { title: "赵文千 — 大模型数据工程师与写作者", description: "把模型的问题，变成数据能回答的问题。", images: [{ url: "/og.png" }] },
  twitter: { card: "summary_large_image", title: "赵文千 — 大模型数据工程师与写作者", description: "把模型的问题，变成数据能回答的问题。", images: ["/og.png"] },
};

const rooms = [
  { number: "01", title: "关于", note: "我是谁，以及我在意什么。", href: "/zh/about/", tone: "violet", mark: "✳" },
  { number: "02", title: "经历", note: "从 Spokane 出发，一路走到大模型。", href: "/zh/experience/", tone: "peach", mark: "↳" },
  { number: "03", title: "项目", note: "做过的项目，解决过的问题。", href: "/zh/work/", tone: "green", mark: "⌁" },
  { number: "04", title: "随笔", note: "AI、品味，还有那些没想明白的事。", href: "/zh/writing/", tone: "blue", mark: "◎" },
];

export default function ChineseHome() {
  return (
    <SiteFrame active="HOME" locale="zh">
      <PointerField />
      <section className="homeHero">
        <p className="eyebrow"><i /> WENQIAN 在线 · 2026</p>
        <h1>把模型的问题，<br />变成<em>数据能回答的问题。</em></h1>
        <p className="homeIntro">大模型数据 · 算法 · 偶尔写点东西</p>
        <a className="scrollCue" href="#explore">从这里开始 <span>↓</span></a>
      </section>
      <section className="roomSection" id="explore">
        <div className="sectionRail"><span>往里走走</span><span>01 — 04</span></div>
        <div className="roomGrid">{rooms.map((room) => <a className={`roomCard ${room.tone}`} href={room.href} key={room.title}><div><span>{room.number}</span><span>打开 ↗</span></div><i aria-hidden="true">{room.mark}</i><h2>{room.title}</h2><p>{room.note}</p></a>)}</div>
      </section>
      <div className="ticker" aria-hidden="true"><div>语言模型 ✦ 数据质量 ✦ 产品品味 ✦ 音乐 ✦ 网球 ✦ F1 ✦ 还有很多没想完的问题 ✦ 语言模型 ✦ 数据质量 ✦</div></div>
    </SiteFrame>
  );
}
