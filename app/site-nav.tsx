import { siteConfig } from "@/app/config";
import { ThemeToggle } from "@/app/theme-toggle";

export function SiteNav() {
  return (
    <header className="topnav" data-od-id="topnav">
      <div className="container topnav-inner">
        <span className="logo">{siteConfig.name}</span>
        <nav>
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
        <ThemeToggle />
      </div>
    </header>
  );
}
