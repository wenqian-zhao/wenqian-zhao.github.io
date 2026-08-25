import type { Metadata } from "next";
import { SiteFrame } from "../components/SiteFrame";
import { writings } from "../generated-writings";

export const metadata: Metadata = {
  title: "Writing — Wenqian Zhao",
  description: "Wenqian Zhao’s notes on AI, taste, work, and life.",
  openGraph: { title: "Writing — Wenqian Zhao", description: "Notes from a restless mind.", images: [] },
  twitter: { card: "summary", title: "Writing — Wenqian Zhao", description: "Notes from a restless mind.", images: [] },
};

export default function WritingPage() {
  return (
    <SiteFrame active="WRITING">
      <section className="pageIntro"><p className="eyebrow">04 / FIELD NOTES</p><h1>Ideas that<br /><em>talk back.</em></h1><p>Notes on AI, taste, work, and life—now readable without leaving this site.</p></section>
      <section className="articleSection">
        <div className="articleHead"><span>NO.</span><span>ARTICLE</span><span>TYPE / DATE</span><span>OPEN</span></div>
        {writings.map((writing, index) => (
          <a className="articleRow" href={`/writing/${writing.slug}/`} key={writing.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span><div><h2>{writing.title}</h2><p>{writing.description}</p></div><span>{writing.category}<br />{writing.date}</span><span>→</span>
          </a>
        ))}
        <a className="archiveButton" href="https://wenqianzhao.wordpress.com/" target="_blank" rel="noreferrer">COMPLETE WORDPRESS ARCHIVE <span>↗</span></a>
      </section>
    </SiteFrame>
  );
}
