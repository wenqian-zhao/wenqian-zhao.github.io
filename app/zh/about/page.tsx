import type { Metadata } from "next";
import { SiteFrame } from "../../components/SiteFrame";

export const metadata: Metadata = { title: "关于 — 赵文茜", description: "我做大模型数据与算法，也写点东西。", openGraph: { title: "关于 — 赵文茜", description: "我是谁，以及我在意什么。", images: [] }, twitter: { card: "summary", title: "关于 — 赵文茜", description: "我是谁，以及我在意什么。", images: [] } };

export default function ChineseAboutPage() {
  return <SiteFrame active="ABOUT" locale="zh">
    <section className="pageIntro aboutIntro"><p className="eyebrow">01 / 关于</p><h1>把混乱的问题，<br /><em>理出头绪。</em></h1><p>我喜欢的问题通常没有标准答案，但可以被拆开、测量，然后一点点做得更好。</p></section>
    <section className="aboutLead"><p className="sectionNumber">A / 现在</p><div><h2>我给大模型做数据，<br />也研究模型为什么会这样。</h2><p>从预训练语料质量、数据分布，到 SFT、评测和 RL 数据，我做的事情大多围绕同一个目标：让模型的问题变得看得见，也让改进不再只靠感觉。现在在蚂蚁集团，此前在 MiniMax 待了两年。</p><ul className="compactFacts" aria-label="关键信息"><li><strong>UCSD</strong><span>数据科学 · 3.9/4.0</span></li><li><strong>TB 级</strong><span>预训练语料</span></li><li><strong>10K+</strong><span>Query–Rubric 数据对</span></li></ul></div></section>
    <section className="interestStrip"><p className="sectionNumber">B / 下班以后</p><h2>写字、打网球，<br /><em>再听一点音乐。</em></h2><p>很多事情都是写下来以后，我才知道自己到底在想什么。</p></section>
  </SiteFrame>;
}
