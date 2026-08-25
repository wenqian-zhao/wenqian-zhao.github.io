const projects = [
  {
    number: "01",
    title: "Language model evaluation",
    description: "Thinking through benchmarks for diffusion language models — and what a fair test should actually measure.",
    tags: ["LLM", "Evaluation", "Research"],
    href: "https://wenqianzhao.wordpress.com/2025/11/16/a-thinking-on-different-lms/",
    art: "model",
  },
  {
    number: "02",
    title: "Image caption generator",
    description: "An encoder–decoder network pairing a pretrained ResNet-50 with LSTM to turn images into natural-language captions.",
    tags: ["PyTorch", "Computer Vision", "NLP"],
    href: "https://github.com/wenqian-zhao/Image-Caption-Generator-with-ResNet-50-and-LSTM",
    art: "caption",
  },
  {
    number: "03",
    title: "User intent classification",
    description: "A fine-tuned BERT model for classifying natural-language user input across the Amazon MASSIVE dataset.",
    tags: ["BERT", "NLP", "Classification"],
    href: "https://github.com/wenqian-zhao/User-Intent-Classification",
    art: "intent",
  },
  {
    number: "04",
    title: "NYC Airbnb prediction",
    description: "Ensemble machine-learning methods used to understand the signals behind New York City Airbnb pricing.",
    tags: ["ML", "Data Mining", "Python"],
    href: "https://github.com/wenqian-zhao/NYC-Airbnb-Price-Prediction",
    art: "airbnb",
  },
];

const posts = [
  {
    date: "Nov 16, 2025",
    category: "Notes",
    title: "Thoughts after ‘做自己能够喜欢的事情很重要’",
    excerpt: "On freedom, conviction, long-term thinking, and learning to feel a market before trying to explain it.",
    href: "https://wenqianzhao.wordpress.com/2025/11/16/thoughts-after-%e5%af%b9%e8%af%9d%e6%ae%b5%e6%b0%b8%e5%b9%b3%ef%bc%9a%e5%81%9a%e8%87%aa%e5%b7%b1%e8%83%bd%e5%a4%9f%e5%96%9c%e6%ac%a2%e7%9a%84%e4%ba%8b%e6%83%85%e5%be%88%e9%87%8d%e8%a6%81/",
  },
  {
    date: "Nov 16, 2025",
    category: "AI",
    title: "A Thinking on Different LMs",
    excerpt: "Autoregressive models write forward. Diffusion models begin with a shape, then refine. How should we evaluate that difference?",
    href: "https://wenqianzhao.wordpress.com/2025/11/16/a-thinking-on-different-lms/",
  },
  {
    date: "Oct 27, 2025",
    category: "Taste",
    title: "Why Taste Is a Thing",
    excerpt: "In an era of increasingly capable AI, taste may be the rare human quality that matters more, not less.",
    href: "https://wenqianzhao.wordpress.com/2025/10/27/why-taste-is-a-thing/",
  },
  {
    date: "Sep 28, 2025",
    category: "AI",
    title: "Are LLMs ‘Intelligences’ ?",
    excerpt: "A wandering inquiry into intelligence, agency, prompts, tools, and where human thinking ends — if it does.",
    href: "https://wenqianzhao.wordpress.com/2025/09/28/are-llms-intelligences/",
  },
  {
    date: "Sep 25, 2025",
    category: "Life",
    title: "失业 day 2 有感",
    excerpt: "A candid day-two note on leaving MiniMax, newfound freedom, work anxiety, coffee, tennis, and time.",
    href: "https://wenqianzhao.wordpress.com/2025/09/25/hello-world/",
  },
  {
    date: "Sep 24, 2025",
    category: "Archive",
    title: "阿丹随手记 — Archive",
    excerpt: "Two years of thinking, learning, frustration, gratitude, and small observations from inside MiniMax.",
    href: "https://wenqianzhao.wordpress.com/2025/09/24/%e9%98%bf%e4%b8%b9%e9%9a%8f%e6%89%8b%e8%ae%b0-archive/",
  },
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Wenqian Zhao home">WZ</a>
        <div className="navLinks">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#writing">Writing</a>
        </div>
        <a className="navCta" href="mailto:wez0012@outlook.com">Let’s talk</a>
      </nav>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow"><span /> Data scientist · AI builder · Writer</p>
          <h1>I turn complex ideas into <em>useful things.</em></h1>
          <p className="lede">
            I’m Wenqian Zhao — a data scientist exploring language models,
            evaluation, product taste, and the human side of technology.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#work">Explore my work <span>↘</span></a>
            <a className="button secondary" href="#writing">Read my notes</a>
          </div>
        </div>

        <div className="heroVisual" aria-label="A visual portrait of Wenqian's interests">
          <div className="orb orbOne" />
          <div className="orb orbTwo" />
          <div className="portraitCard">
            <div className="monogram">W</div>
            <div className="cardMeta">
              <p>Currently curious about</p>
              <strong>How machines think —<br />and how we judge them.</strong>
            </div>
          </div>
          <div className="floatingNote noteOne">13 years of cello <span>♪</span></div>
          <div className="floatingNote noteTwo"><i /> Shanghai · San Diego</div>
        </div>
      </section>

      <section className="introStrip" id="about">
        <p>Data science with curiosity, craft, and a little groove.</p>
        <div className="stripMarks" aria-hidden="true"><span>AI</span><span>DATA</span><span>MUSIC</span><span>WRITING</span></div>
      </section>

      <section className="about sectionShell">
        <div className="sectionLabel"><span>01</span> About</div>
        <div className="aboutGrid">
          <h2>I care about the space between <span>technical rigor</span> and <span>good taste.</span></h2>
          <div className="aboutBody">
            <p>
              My path runs from data science at UC San Diego to large-scale
              content analysis at ByteDance and two years of building and
              thinking at MiniMax. I like difficult questions: how do we know a
              model is good, what makes a product feel right, and when does data
              become a useful decision?
            </p>
            <p>
              Away from a keyboard, I play cello and bass, follow Formula 1,
              and keep returning to a tennis court. Music taught me timing;
              sport taught me iteration. Both quietly shape how I work.
            </p>
            <a className="textLink" href="mailto:wez0012@outlook.com">More about me <span>↗</span></a>
          </div>
        </div>

        <div className="timeline" aria-label="Experience and education timeline">
          <div className="timelineItem"><span className="timelineYear">2019–25</span><strong>UC San Diego</strong><p>Data Science · B.S. + M.S.</p></div>
          <div className="timelineItem"><span className="timelineYear">2021</span><strong>Inspur Group</strong><p>Product management</p></div>
          <div className="timelineItem"><span className="timelineYear">2022</span><strong>ByteDance</strong><p>Data analysis · NLP</p></div>
          <div className="timelineItem current"><span className="timelineYear">2023–25</span><strong>MiniMax</strong><p>AI · product · evaluation</p></div>
        </div>
      </section>

      <section className="work sectionShell" id="work">
        <div className="sectionHeader">
          <div className="sectionLabel light"><span>02</span> Selected work</div>
          <p>Projects where models meet real questions.</p>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <a className="projectCard" href={project.href} target="_blank" rel="noreferrer" key={project.title}>
              <div className={`projectArt ${project.art}`} aria-hidden="true">
                {project.art === "model" && <><div className="noiseCloud">idea</div><div className="arrowLine">→</div><div className="tokenStack"><i /><i /><i /></div></>}
                {project.art === "caption" && <><div className="sunShape" /><div className="captionLines"><i /><i /><i /></div></>}
                {project.art === "intent" && <><div className="chatBubble">How can I…</div><div className="intentTag">intent / 42</div></>}
                {project.art === "airbnb" && <><div className="cityBars"><i /><i /><i /><i /><i /></div><div className="priceDot">$</div></>}
              </div>
              <div className="projectInfo">
                <div className="projectTop"><span>{project.number}</span><span className="projectArrow">↗</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="writing sectionShell" id="writing">
        <div className="writingHeader">
          <div>
            <div className="sectionLabel"><span>03</span> Recent writing</div>
            <h2>Notes from a<br /><em>restless mind.</em></h2>
          </div>
          <p>Thoughts on AI, taste, work, and the strange little details that connect them.</p>
        </div>
        <div className="postList">
          {posts.map((post, index) => (
            <a className="postRow" href={post.href} target="_blank" rel="noreferrer" key={post.href}>
              <div className="postIndex">{String(index + 1).padStart(2, "0")}</div>
              <div className="postMain"><div className="postMeta"><span>{post.category}</span>{post.date}</div><h3>{post.title}</h3><p>{post.excerpt}</p></div>
              <span className="postArrow">↗</span>
            </a>
          ))}
        </div>
        <a className="allPosts" href="https://wenqianzhao.wordpress.com/" target="_blank" rel="noreferrer">Visit the complete archive <span>↗</span></a>
      </section>

      <section className="contact sectionShell" id="contact">
        <p className="eyebrow"><span /> Open to interesting conversations</p>
        <h2>Have an idea worth<br /><em>thinking about?</em></h2>
        <a className="contactButton" href="mailto:wez0012@outlook.com">Start a conversation <span>↗</span></a>
      </section>

      <footer>
        <a className="footerMark" href="#top">WZ</a>
        <p>© 2026 Wenqian Zhao. Made with curiosity.</p>
        <div className="socials">
          <a href="https://github.com/wenqian-zhao" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.instagram.com/mnizwq/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="mailto:wez0012@outlook.com">Email ↗</a>
        </div>
      </footer>
    </main>
  );
}
