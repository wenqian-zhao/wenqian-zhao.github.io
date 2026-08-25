import type { Metadata } from "next";
import { SiteFrame } from "../components/SiteFrame";

export const metadata: Metadata = {
  title: "Experience — Wenqian Zhao",
  description: "Wenqian Zhao’s education and work in data science and large language models.",
  openGraph: { title: "Experience — Wenqian Zhao", description: "From Spokane to large-language-model data engineering.", images: [] },
  twitter: { card: "summary", title: "Experience — Wenqian Zhao", description: "From Spokane to large-language-model data engineering.", images: [] },
};

const timeline = [
  { date: "2025.10 — NOW", place: "Ant Group", location: "Hangzhou, CN", role: "R&D Engineer · Algorithm Engineer", summary: "Post-training data for LLaDA and medical models: SFT governance, training diagnostics, reasoning distillation, evaluation, and RL data production.", mark: "✦" },
  { date: "2023.10 — 2025.09", place: "MiniMax", location: "Shanghai, CN", role: "Data Scientist → Data Algorithm Engineer", summary: "Built evaluation and sampling systems for model iteration, then moved into pre-training data quality modeling and distribution optimization for MiniMax-M2.", mark: "∿" },
  { date: "2019.09 — 2023.03", place: "UC San Diego", location: "La Jolla, CA", role: "B.S. in Data Science", summary: "GPA 3.9/4.0, top 5%, and a Marshall College Honors Program scholar.", mark: "◎" },
  { date: "BEFORE 2019", place: "Saint George’s School", location: "Spokane, WA", role: "High School", summary: "The first stop in the route from Spokane to San Diego, Shanghai, and Hangzhou.", mark: "⌂" },
];

export default function ExperiencePage() {
  return (
    <SiteFrame active="EXPERIENCE">
      <section className="pageIntro"><p className="eyebrow">02 / EXPERIENCE</p><h1>The route<br /><em>so far.</em></h1><p>Education and work, arranged as one continuous line instead of a wall of résumé text.</p></section>
      <section className="verticalTimeline" aria-label="Education and work timeline">
        {timeline.map((item, index) => (
          <article key={item.place + item.date}>
            <div className="timelineAxis"><span>{String(index + 1).padStart(2, "0")}</span><i /></div><p className="timelineDate">{item.date}</p>
            <div className="timelineBody"><div><h2>{item.place}</h2><span>{item.location}</span></div><h3>{item.role}</h3><p>{item.summary}</p></div><span className="timelineMark" aria-hidden="true">{item.mark}</span>
          </article>
        ))}
      </section>
    </SiteFrame>
  );
}
