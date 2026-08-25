import type { Metadata } from "next";
import { SiteFrame } from "../components/SiteFrame";

export const metadata: Metadata = {
  title: "About — Wenqian Zhao",
  description: "About Wenqian Zhao, an LLM data and algorithm engineer who also writes about AI, taste, and life.",
  openGraph: { title: "About — Wenqian Zhao", description: "The person behind the datasets.", images: [] },
  twitter: { card: "summary", title: "About — Wenqian Zhao", description: "The person behind the datasets.", images: [] },
};

export default function AboutPage() {
  return (
    <SiteFrame active="ABOUT">
      <section className="pageIntro aboutIntro"><p className="eyebrow">01 / ABOUT</p><h1>Technical rigor,<br /><em>human taste.</em></h1><p>I care about the space where data becomes a decision, and where a capable model becomes a product people actually want to use.</p></section>
      <section className="aboutLead">
        <p className="sectionNumber">A / NOW</p>
        <div><h2>I build the data systems<br />behind language models.</h2><p>My work spans pre-training quality modeling, data-distribution optimization, SFT governance, evaluation, and RL data production. I like turning fuzzy model behavior into something a team can inspect, measure, and improve.</p></div>
      </section>
      <section className="factsGrid" aria-label="Selected facts">
        <article><span>01</span><strong>3.9 / 4.0</strong><p>UC San Diego<br />Data Science</p></article>
        <article><span>02</span><strong>TB-scale</strong><p>pre-training corpus<br />quality systems</p></article>
        <article><span>03</span><strong>10K+</strong><p>Query–Rubric pairs<br />delivered for RL</p></article>
        <article><span>04</span><strong>12.6K+</strong><p>stars on the AISYS<br />open-source project</p></article>
      </section>
      <section className="interestStrip">
        <p className="sectionNumber">B / OFF THE CLOCK</p>
        <h2>Cello. Bass. Tennis.<br /><em>Formula 1. Good questions.</em></h2>
        <p>Writing is how I slow ideas down long enough to understand them. Music and tennis do something similar—just without the dashboards.</p>
      </section>
    </SiteFrame>
  );
}
