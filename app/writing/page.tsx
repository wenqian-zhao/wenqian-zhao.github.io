import type { Metadata } from "next";
import { SiteFrame } from "../components/SiteFrame";
import { posts } from "../site-data";

export const metadata: Metadata = {
  title: "Writing — Wenqian Zhao",
  description: "Wenqian Zhao’s notes on AI, taste, work, and life.",
  openGraph: { title: "Writing — Wenqian Zhao", description: "Notes from a restless mind.", images: [] },
  twitter: { card: "summary", title: "Writing — Wenqian Zhao", description: "Notes from a restless mind.", images: [] },
};

export default function WritingPage() {
  return (
    <SiteFrame active="WRITING">
      <section className="pageIntro"><p className="eyebrow">04 / FIELD NOTES</p><h1>Ideas that<br /><em>talk back.</em></h1><p>Thoughts on AI, taste, work, and the strange little details that connect them. The articles remain on WordPress; this is the new front door.</p></section>
      <section className="articleSection">
        <div className="articleHead"><span>NO.</span><span>ARTICLE</span><span>TYPE / DATE</span><span>OPEN</span></div>
        {posts.map((post, index) => (
          <a className="articleRow" href={post.href} target="_blank" rel="noreferrer" key={post.href}>
            <span>{String(index + 1).padStart(2, "0")}</span><div><h2>{post.title}</h2><p>{post.excerpt}</p></div><span>{post.category}<br />{post.date}</span><span>↗</span>
          </a>
        ))}
        <a className="archiveButton" href="https://wenqianzhao.wordpress.com/" target="_blank" rel="noreferrer">COMPLETE WORDPRESS ARCHIVE <span>↗</span></a>
      </section>
    </SiteFrame>
  );
}
