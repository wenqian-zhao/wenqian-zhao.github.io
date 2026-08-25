import type { Metadata } from "next";
import { SiteFrame } from "../../components/SiteFrame";

export const metadata: Metadata = { title: "经历 — 赵文茜", description: "从 Spokane 到 UCSD，再到 MiniMax 和蚂蚁集团。", openGraph: { title: "经历 — 赵文茜", description: "一路走来。", images: [] }, twitter: { card: "summary", title: "经历 — 赵文茜", description: "一路走来。", images: [] } };
const timeline = [
  { date: "2025.10 — 至今", place: "蚂蚁集团", location: "杭州", role: "研发工程师 · 算法工程师", summary: "做 LLaDA 和医疗模型的后训练数据。从 SFT 数据治理、训练诊断，到推理蒸馏、评测和 RL 数据生产。", mark: "✦" },
  { date: "2023.10 — 2025.09", place: "MiniMax", location: "上海", role: "数据科学家 → 数据算法工程师", summary: "先为模型迭代搭建评测和采样系统，后来转向预训练数据，负责 MiniMax-M2 的质量建模和数据分布优化。", mark: "∿" },
  { date: "2019.09 — 2023.03", place: "UC San Diego", location: "La Jolla, CA", role: "数据科学 · 本科", summary: "GPA 3.9/4.0，专业前 5%，入选 Marshall College Honors Program。", mark: "◎" },
  { date: "2019 年以前", place: "Saint George’s School", location: "Spokane, WA", role: "高中", summary: "故事从 Spokane 开始。后来去了 San Diego，再回到上海和杭州。", mark: "⌂" },
];
export default function ChineseExperiencePage() { return <SiteFrame active="EXPERIENCE" locale="zh"><section className="pageIntro"><p className="eyebrow">02 / 经历</p><h1>一路<br /><em>走来。</em></h1><p>从 Spokane 的高中，到 UCSD，再到上海和杭州。这里放的是每一段路上最重要的事。</p></section><section className="verticalTimeline" aria-label="教育与工作时间线">{timeline.map((item, index) => <article key={item.place + item.date}><div className="timelineAxis"><span>{String(index + 1).padStart(2, "0")}</span><i /></div><p className="timelineDate">{item.date}</p><div className="timelineBody"><div><h2>{item.place}</h2><span>{item.location}</span></div><h3>{item.role}</h3><p>{item.summary}</p></div><span className="timelineMark" aria-hidden="true">{item.mark}</span></article>)}</section></SiteFrame>; }
