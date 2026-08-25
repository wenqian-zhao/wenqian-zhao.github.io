import type { Metadata } from "next";
import { SiteFrame } from "../../components/SiteFrame";

export const metadata: Metadata = { title: "关于 — 赵文茜", description: "关于大模型数据与算法工程师赵文茜。", openGraph: { title: "关于 — 赵文茜", description: "数据集背后的那个人。", images: [] }, twitter: { card: "summary", title: "关于 — 赵文茜", description: "数据集背后的那个人。", images: [] } };

export default function ChineseAboutPage() {
  return <SiteFrame active="ABOUT" locale="zh">
    <section className="pageIntro aboutIntro"><p className="eyebrow">01 / 关于</p><h1>数据、模型<br /><em>与好问题。</em></h1><p>我把混乱的模型行为，变成团队能够检查、衡量和改进的数据。</p></section>
    <section className="aboutLead"><p className="sectionNumber">A / 此刻</p><div><h2>我为语言模型<br />搭建数据系统。</h2><p>我的工作覆盖预训练质量、数据分布优化、SFT 治理、评测和 RL 数据生产。目前在蚂蚁集团，此前在 MiniMax 工作了两年。</p><ul className="compactFacts" aria-label="关键信息"><li><strong>UCSD</strong><span>数据科学 · 3.9/4.0</span></li><li><strong>TB 级</strong><span>预训练语料</span></li><li><strong>10K+</strong><span>Query–Rubric 数据对</span></li></ul></div></section>
    <section className="interestStrip"><p className="sectionNumber">B / 工作之外</p><h2>音乐、网球，<br /><em>还有间隙里的随笔。</em></h2><p>写作让我把想法放慢，直到自己真正理解它。</p></section>
  </SiteFrame>;
}
