import { siteConfig } from "@/app/config";

export function SiteFooter() {
  return (
    <footer className="pagefoot" data-od-id="footer">
      <div className="container row-between">
        <span>© 2026 Pannathorn Brikshavana</span>
        <span className="meta">Notes app with an LLM-backed Q&amp;A endpoint</span>
        <nav className="pagefoot-links">
          <a href={siteConfig.apiRepoUrl} target="_blank" rel="noopener">
            capstone-api
          </a>
          <a href={siteConfig.webRepoUrl} target="_blank" rel="noopener">
            capstone-web
          </a>
          <a href={siteConfig.resumeUrl} target="_blank" rel="noopener">
            Résumé
          </a>
        </nav>
      </div>
    </footer>
  );
}
