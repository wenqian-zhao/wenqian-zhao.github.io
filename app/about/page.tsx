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
      <section className="pageIntro aboutIntro"><p className="eyebrow">01 / ABOUT</p><h1>Data, models<br /><em>& good questions.</em></h1><p>I turn messy model behavior into data a team can inspect, measure, and improve.</p></section>
      <section className="aboutLead">
        <p className="sectionNumber">A / NOW</p>
        <div>
          <h2>I build data systems<br />for language models.</h2>
          <p>My work covers pre-training quality, data-distribution optimization, SFT governance, evaluation, and RL data production—currently at Ant Group, after two years at MiniMax.</p>
          <ul className="compactFacts" aria-label="Selected facts">
            <li><strong>UCSD</strong><span>Data Science · 3.9/4.0</span></li>
            <li><strong>TB-SCALE</strong><span>Pre-training corpora</span></li>
            <li><strong>10K+</strong><span>Query–Rubric pairs</span></li>
          </ul>
        </div>
      </section>
      <section className="interestStrip">
        <p className="sectionNumber">B / OFF THE CLOCK</p>
        <h2>Music, tennis,<br /><em>and notes in between.</em></h2>
        <p>Writing is how I slow ideas down long enough to understand them.</p>
      </section>
    </SiteFrame>
  );
}
