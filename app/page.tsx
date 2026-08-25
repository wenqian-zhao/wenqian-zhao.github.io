const projects = [
  {
    number: "01",
    eyebrow: "LANGUAGE MODELS / EVALUATION",
    title: "How should we test a model that thinks differently?",
    description: "Notes on diffusion language models, benchmarks, and what a fair evaluation should actually measure.",
    tags: ["LLM", "RESEARCH", "EVALUATION"],
    href: "https://wenqianzhao.wordpress.com/2025/11/16/a-thinking-on-different-lms/",
    tone: "violet",
    mark: "∿",
  },
  {
    number: "02",
    eyebrow: "COMPUTER VISION / NLP",
    title: "Teaching a machine to describe what it sees.",
    description: "A ResNet-50 and LSTM encoder–decoder trained to turn images from COCO into natural-language captions.",
    tags: ["PYTORCH", "RESNET-50", "LSTM"],
    href: "https://github.com/wenqian-zhao/Image-Caption-Generator-with-ResNet-50-and-LSTM",
    tone: "peach",
    mark: "◎",
  },
  {
    number: "03",
    eyebrow: "NATURAL LANGUAGE / INTENT",
    title: "What do people really mean when they ask?",
    description: "A fine-tuned BERT model for classifying user intent across the multilingual Amazon MASSIVE dataset.",
    tags: ["BERT", "NLP", "CLASSIFICATION"],
    href: "https://github.com/wenqian-zhao/User-Intent-Classification",
    tone: "green",
    mark: "↳",
  },
  {
    number: "04",
    eyebrow: "DATA MINING / PREDICTION",
    title: "Finding the hidden price of a night in New York.",
    description: "Ensemble machine-learning methods used to understand the signals behind New York City Airbnb pricing.",
    tags: ["ML", "PYTHON", "ENSEMBLE"],
    href: "https://github.com/wenqian-zhao/NYC-Airbnb-Price-Prediction",
    tone: "blue",
    mark: "⌂",
  },
];

const posts = [
  {
    date: "16.11.25",
    category: "随手记",
    title: "Thoughts after ‘做自己能够喜欢的事情很重要’",
    excerpt: "On freedom, conviction, and learning to feel a market before trying to explain it.",
    href: "https://wenqianzhao.wordpress.com/2025/11/16/thoughts-after-%e5%af%b9%e8%af%9d%e6%ae%b5%e6%b0%b8%e5%b9%b3%ef%bc%9a%e5%81%9a%e8%87%aa%e5%b7%b1%e8%83%bd%e5%a4%9f%e5%96%9c%e6%ac%a2%e7%9a%84%e4%ba%8b%e6%83%85%e5%be%88%e9%87%8d%e8%a6%81/",
  },
  {
    date: "16.11.25",
    category: "AI",
    title: "A Thinking on Different LMs",
    excerpt: "Autoregressive models write forward. Diffusion models begin with a shape, then refine.",
    href: "https://wenqianzhao.wordpress.com/2025/11/16/a-thinking-on-different-lms/",
  },
  {
    date: "27.10.25",
    category: "Taste",
    title: "Why Taste Is a Thing",
    excerpt: "In an era of capable AI, taste may be the human quality that matters more, not less.",
    href: "https://wenqianzhao.wordpress.com/2025/10/27/why-taste-is-a-thing/",
  },
  {
    date: "28.09.25",
    category: "AI",
    title: "Are LLMs ‘Intelligences’ ?",
    excerpt: "A wandering inquiry into intelligence, agency, prompts, tools, and where human thinking ends.",
    href: "https://wenqianzhao.wordpress.com/2025/09/28/are-llms-intelligences/",
  },
  {
    date: "25.09.25",
    category: "Life",
    title: "失业 day 2 有感",
    excerpt: "A candid note on leaving MiniMax, newfound freedom, coffee, tennis, and time.",
    href: "https://wenqianzhao.wordpress.com/2025/09/25/hello-world/",
  },
  {
    date: "24.09.25",
    category: "Archive",
    title: "阿丹随手记 — Archive",
    excerpt: "Two years of thinking, learning, frustration, gratitude, and small observations from MiniMax.",
    href: "https://wenqianzhao.wordpress.com/2025/09/24/%e9%98%bf%e4%b8%b9%e9%9a%8f%e6%89%8b%e8%ae%b0-archive/",
  },
];

export default function Home() {
  return (
    <>
      <input className="themeSwitch" id="theme-switch" type="checkbox" aria-label="Switch color theme" />
      <main className="site">
        <section className="hero" id="top">
          <nav className="utility" aria-label="Primary navigation">
            <div className="utilityGroup">
              <div className="status"><i /> WENQIAN IS ONLINE</div>
              <label htmlFor="theme-switch"><span className="square" /> THEME</label>
            </div>
            <div className="utilityNav">
              <a href="#about">ABOUT</a>
              <a href="#work">WORK</a>
              <a href="#writing">NOTES</a>
            </div>
          </nav>

          <div className="heroCenter">
            <div className="seal" aria-label="Wenqian Zhao, data and ideas">
              <span>WENQIAN</span><strong>WZ</strong><span>ZHAO</span>
            </div>
            <h1>
              I’m exploring better ways to understand
              <a href="#work"> machines</a> and <a href="#writing">ourselves</a>.
            </h1>
            <p className="intro">DATA SCIENTIST · AI BUILDER · WRITER</p>
            <div className="heroLinks">
              <a href="#work"><span className="glyph">⌁</span> SELECTED WORK</a>
              <a href="#writing"><span className="glyph">✣</span> FIELD NOTES</a>
            </div>
          </div>

          <div className="heroFooter" aria-hidden="true">
            <span>DATA ↔ TASTE</span><span>SHANGHAI / SAN DIEGO</span><span>EST. 1999</span>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div>LANGUAGE MODELS ✦ PRODUCT TASTE ✦ DATA SCIENCE ✦ MUSIC ✦ TENNIS ✦ FORMULA 1 ✦ LANGUAGE MODELS ✦ PRODUCT TASTE ✦ DATA SCIENCE ✦</div>
        </div>

        <section className="about" id="about">
          <div className="sideLabel">01 / A SHORT INTRODUCTION</div>
          <div className="aboutStatement">
            <p className="sectionKicker"><span>✳</span> THE WORK, IN ONE SENTENCE</p>
            <h2>I care about the space between <em>technical rigor</em> and <em>good taste.</em></h2>
          </div>
          <div className="aboutText">
            <p>
              My path runs from data science at UC San Diego to large-scale
              content analysis at ByteDance and two years of building and
              thinking at MiniMax.
            </p>
            <p>
              I like difficult questions: how do we know a model is good, what
              makes a product feel right, and when does data become a useful
              decision?
            </p>
          </div>
          <div className="aboutFootnotes">
            <span>① CELLO / 13 YEARS</span><span>② BASS / 7 YEARS</span><span>③ TENNIS / 16 YEARS</span><span>④ ALWAYS CURIOUS</span>
          </div>
        </section>

        <section className="timelineSection" aria-label="Experience and education timeline">
          <div className="timelineHeader"><span>CURRICULUM VITAE</span><span>2019 — 2025</span></div>
          <div className="timelineGrid">
            <article><span>2019—25</span><h3>UC SAN DIEGO</h3><p>Data Science<br />B.S. + M.S.</p><i>⌘</i></article>
            <article><span>2021</span><h3>INSPUR GROUP</h3><p>Product<br />Management</p><i>◇</i></article>
            <article><span>2022</span><h3>BYTEDANCE</h3><p>Data Analysis<br />+ NLP</p><i>◉</i></article>
            <article><span>2023—25</span><h3>MINIMAX</h3><p>AI · Product<br />+ Evaluation</p><i>✦</i></article>
          </div>
        </section>

        <section className="work" id="work">
          <div className="sectionTop">
            <span>02 / SELECTED WORK</span>
            <p>FOUR QUESTIONS,<br />A FEW POSSIBLE ANSWERS.</p>
          </div>
          <div className="workGrid">
            {projects.map((project) => (
              <a className={`project ${project.tone}`} href={project.href} target="_blank" rel="noreferrer" key={project.title}>
                <div className="projectHead"><span>{project.number}</span><span>{project.eyebrow}</span><span>↗</span></div>
                <div className="projectMark" aria-hidden="true">{project.mark}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="projectTags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </a>
            ))}
          </div>
        </section>

        <section className="writing" id="writing">
          <div className="writingIntro">
            <div className="sideLabel">03 / NOTES FROM A RESTLESS MIND</div>
            <h2>Things I wrote down<br />so they could <em>talk back.</em></h2>
            <p>Thoughts on AI, taste, work, and the strange little details that connect them.</p>
          </div>
          <div className="postIndex">
            <div className="postIndexHead"><span>NO.</span><span>ARTICLE</span><span>TYPE / DATE</span><span>OPEN</span></div>
            {posts.map((post, index) => (
              <a href={post.href} target="_blank" rel="noreferrer" className="post" key={post.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{post.title}</h3><p>{post.excerpt}</p></div>
                <span>{post.category}<br />{post.date}</span>
                <span className="postArrow">↗</span>
              </a>
            ))}
          </div>
          <a className="archiveLink" href="https://wenqianzhao.wordpress.com/" target="_blank" rel="noreferrer"><span>◎</span> COMPLETE WORDPRESS ARCHIVE <span>↗</span></a>
        </section>

        <section className="contact" id="contact">
          <div className="contactStamp">OPEN TO<br />GOOD<br />QUESTIONS</div>
          <p>ONE MORE THING</p>
          <h2>If the question is interesting,<br /><em>I’d like to hear it.</em></h2>
          <a href="mailto:wez0012@outlook.com">START A CONVERSATION <span>↗</span></a>
        </section>

        <footer>
          <div className="footerOrnament">◎</div>
          <div className="footerLinks">
            <a href="#about">ABOUT</a><a href="#work">WORK</a><a href="#writing">NOTES</a>
            <a href="https://github.com/wenqian-zhao" target="_blank" rel="noreferrer">GITHUB</a>
            <a href="mailto:wez0012@outlook.com">EMAIL</a>
          </div>
          <div className="footerBottom"><span>WZ / 2026</span><span>MADE WITH CURIOSITY</span><span>SHANGHAI ↔ SAN DIEGO</span></div>
        </footer>
      </main>
    </>
  );
}
