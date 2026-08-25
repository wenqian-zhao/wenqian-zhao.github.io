import type { ReactNode } from "react";

const navigation = [
  ["HOME", "/"],
  ["ABOUT", "/about/"],
  ["EXPERIENCE", "/experience/"],
  ["WORK", "/work/"],
  ["WRITING", "/writing/"],
] as const;

export function SiteFrame({ active, children }: { active: string; children: ReactNode }) {
  return (
    <>
      <input className="themeSwitch" id="theme-switch" type="checkbox" aria-label="Switch color theme" />
      <main className="site">
        <header className="siteHeader">
          <a className="wordmark" href="/" aria-label="Wenqian Zhao, home"><span>WENQIAN</span><strong>WZ</strong><span>ZHAO</span></a>
          <nav className="siteNav" aria-label="Primary navigation">
            {navigation.map(([label, href]) => <a aria-current={active === label ? "page" : undefined} href={href} key={label}>{label}</a>)}
          </nav>
          <label className="themeLabel" htmlFor="theme-switch"><span /> THEME</label>
        </header>
        {children}
        <footer className="siteFooter">
          <div><p>IF THE QUESTION IS INTERESTING,</p><a href="mailto:wez0012@outlook.com">LET’S TALK ↗</a></div>
          <div className="footerLinks">
            <a href="https://github.com/wenqian-zhao" target="_blank" rel="noreferrer">GITHUB ↗</a>
            <a href="https://wenqianzhao.wordpress.com/" target="_blank" rel="noreferrer">WORDPRESS ↗</a>
          </div>
          <p className="footerMeta">WZ / 2026 · SHANGHAI ↔ SAN DIEGO</p>
        </footer>
      </main>
    </>
  );
}
