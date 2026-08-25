import type { Metadata } from "next";
import { SiteFrame } from "../components/SiteFrame";
import { earlierBuilds, professionalProjects } from "../site-data";

export const metadata: Metadata = {
  title: "Selected Work — Wenqian Zhao",
  description: "Selected LLM data engineering, evaluation, and machine-learning work by Wenqian Zhao.",
  openGraph: { title: "Selected Work — Wenqian Zhao", description: "Models, data, and useful questions.", images: [] },
  twitter: { card: "summary", title: "Selected Work — Wenqian Zhao", description: "Models, data, and useful questions.", images: [] },
};

export default function WorkPage() {
  return (
    <SiteFrame active="WORK">
      <section className="pageIntro"><p className="eyebrow">03 / SELECTED WORK</p><h1>Data with<br /><em>a job to do.</em></h1><p>Representative work from the résumé, edited into short case studies with a question, an approach, and a result.</p></section>
      <section className="caseSection">
        <div className="sectionRail"><span>PROFESSIONAL CASES</span><span>01 — 03</span></div>
        <div className="caseGrid">
          {professionalProjects.map((project) => (
            <article className={`caseCard ${project.tone}`} key={project.title}>
              <div className="caseMeta"><span>{project.number}</span><span>{project.company}</span></div>
              <i aria-hidden="true">{project.mark}</i><h2>{project.title}</h2><p>{project.summary}</p><strong>{project.result}</strong>
            </article>
          ))}
        </div>
      </section>
      <section className="buildSection">
        <div><p className="sectionNumber">B / EARLIER BUILDS</p><h2>Before the<br /><em>foundation models.</em></h2></div>
        <div className="buildList">
          {earlierBuilds.map((item, index) => <a href={item.href} target="_blank" rel="noreferrer" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.meta}</p></div><span>↗</span></a>)}
        </div>
      </section>
    </SiteFrame>
  );
}
