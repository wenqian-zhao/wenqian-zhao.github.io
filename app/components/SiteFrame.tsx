import type { ReactNode } from "react";

const navigation = [
  ["HOME", "首页", "/"],
  ["ABOUT", "关于", "/about/"],
  ["EXPERIENCE", "经历", "/experience/"],
  ["WORK", "项目", "/work/"],
  ["WRITING", "文章", "/writing/"],
] as const;

const routeByActive = Object.fromEntries(navigation.map(([key, , href]) => [key, href]));

export function SiteFrame({ active, children, locale = "en", alternateHref }: { active: string; children: ReactNode; locale?: "en" | "zh"; alternateHref?: string }) {
  const isChinese = locale === "zh";
  const currentRoute = routeByActive[active] || "/";
  const languageHref = alternateHref || (isChinese ? currentRoute : `/zh${currentRoute}`);
  return (
    <>
      <input className="themeSwitch" id="theme-switch" type="checkbox" aria-label={isChinese ? "切换颜色主题" : "Switch color theme"} />
      <main className="site" data-section={active} lang={isChinese ? "zh-CN" : "en"}>
        <header className="siteHeader">
          <a className="wordmark" href={isChinese ? "/zh/" : "/"} aria-label={isChinese ? "赵文千，首页" : "Wenqian Zhao, home"}><span>WENQIAN</span><strong>WZ</strong><span>ZHAO</span></a>
          <nav className="siteNav" aria-label={isChinese ? "主导航" : "Primary navigation"}>
            {navigation.map(([key, zhLabel, href]) => <a aria-current={active === key ? "page" : undefined} href={isChinese ? `/zh${href}` : href} key={key}>{isChinese ? zhLabel : key}</a>)}
          </nav>
          <div className="headerActions">
            <a className="languageLink" href={languageHref} lang={isChinese ? "en" : "zh-CN"}>{isChinese ? "EN" : "中文"}</a>
            <label className="themeLabel" htmlFor="theme-switch"><span /> {isChinese ? "主题" : "THEME"}</label>
          </div>
        </header>
        {children}
        <footer className="siteFooter">
          <div><p>{isChinese ? "想聊点有意思的？" : "IF THE QUESTION IS INTERESTING,"}</p><a href="mailto:wez0012@outlook.com">{isChinese ? "给我写信" : "LET’S TALK"} ↗</a></div>
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
