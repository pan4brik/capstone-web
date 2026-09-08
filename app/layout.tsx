import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/app/config";
import { SiteNav } from "@/app/site-nav";
import { SiteFooter } from "@/app/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "PB · Notes + Ask",
  description: siteConfig.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          // Sets [data-theme] before paint so there's no flash of the wrong theme.
          // suppressHydrationWarning above accounts for the attribute this adds pre-hydration.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
