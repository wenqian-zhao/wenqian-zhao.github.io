import type { Metadata } from "next";
import { SiteFrame } from "../../components/SiteFrame";

export const metadata: Metadata = { title: "经历 — 赵文茜", description: "赵文茜在数据科学和大语言模型领域的教育与工作经历。", openGraph: { title: "经历 — 赵文茜", description: "从 Spokane 到大模型数据工程。", images: [] }, twitter: { card: "summary", title: "经历 — 赵文茜", description: "从 Spokane 到大模型数据工程。", images: [] } };
const timeline = [
  { date: "2025.10 — 至今", place: "蚂蚁集团", location: "中国 · 杭州", role: "研发工程师 · 算法工程师", summary: "负责 LLaDA 与医疗模型的后训练数据：SFT 治理、训练诊断、推理蒸馏、评测与 RL 数据生产。", mark: "✦" },
  { date: "2023.10 — 2025.09", place: "MiniMax", location: "中国 · 上海", role: "数据科学家 → 数据算法工程师", summary: "为模型迭代搭建评测与采样系统，随后负责 MiniMax-M2 的预训练数据质量建模和数据分布优化。", mark: "∿" },
  { date: "2019.09 — 2023.03", place: "加州大学圣地亚哥分校", location: "La Jolla, CA", role: "数据科学学士", summary: "GPA 3.9/4.0，专业前 5%，Marshall College Honors Program。", mark: "◎" },
  { date: "2019 年以前", place: "Saint George’s School", location: "Spokane, WA", role: "高中", summary: "从 Spokane 出发，途经 San Diego、上海和杭州。", mark: "⌂" },
];
export default function ChineseExperiencePage() { return <SiteFrame active="EXPERIENCE" locale="zh"><section className="pageIntro"><p className="eyebrow">02 / 经历</p><h1>走过的<br /><em>这条路。</em></h1><p>把教育与工作排成一条连续的时间线，而不是一堵简历文字墙。</p></section><section className="verticalTimeline" aria-label="教育与工作时间线">{timeline.map((item, index) => <article key={item.place + item.date}><div className="timelineAxis"><span>{String(index + 1).padStart(2, "0")}</span><i /></div><p className="timelineDate">{item.date}</p><div className="timelineBody"><div><h2>{item.place}</h2><span>{item.location}</span></div><h3>{item.role}</h3><p>{item.summary}</p></div><span className="timelineMark" aria-hidden="true">{item.mark}</span></article>)}</section></SiteFrame>; }
