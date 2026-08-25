import { SiteFrame } from "./components/SiteFrame";
import { PointerField } from "./components/PointerField";

const rooms = [
  { number: "01", title: "About", note: "The person behind the datasets.", href: "/about/", tone: "violet", mark: "✳" },
  { number: "02", title: "Experience", note: "A timeline from Spokane to AI.", href: "/experience/", tone: "peach", mark: "↳" },
  { number: "03", title: "Selected work", note: "Models, data, and useful questions.", href: "/work/", tone: "green", mark: "⌁" },
  { number: "04", title: "Field notes", note: "Writing about AI, taste, and life.", href: "/writing/", tone: "blue", mark: "◎" },
];

export default function Home() {
  return (
    <SiteFrame active="HOME">
      <PointerField />
      <section className="homeHero">
        <p className="eyebrow"><i /> WENQIAN IS ONLINE · 2026</p>
        <h1>I work with <em>data, models,</em><br />and the questions around them.</h1>
        <p className="homeIntro">LLM DATA ENGINEER · ALGORITHM ENGINEER · WRITER</p>
        <a className="scrollCue" href="#explore">CHOOSE A DOOR <span>↓</span></a>
      </section>
      <section className="roomSection" id="explore">
        <div className="sectionRail"><span>EXPLORE</span><span>01 — 04</span></div>
        <div className="roomGrid">
          {rooms.map((room) => (
            <a className={`roomCard ${room.tone}`} href={room.href} key={room.title}>
              <div><span>{room.number}</span><span>OPEN ↗</span></div><i aria-hidden="true">{room.mark}</i><h2>{room.title}</h2><p>{room.note}</p>
            </a>
          ))}
        </div>
      </section>
      <div className="ticker" aria-hidden="true"><div>LANGUAGE MODELS ✦ DATA QUALITY ✦ PRODUCT TASTE ✦ MUSIC ✦ TENNIS ✦ FORMULA 1 ✦ LANGUAGE MODELS ✦ DATA QUALITY ✦ PRODUCT TASTE ✦</div></div>
    </SiteFrame>
  );
}
