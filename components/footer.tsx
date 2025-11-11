// components/footer.tsx
import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: "Home", href: "/" },
      { label: "Live Matches", href: "/?live=true" },
      { label: "Sports", href: "/" },
    ],
    Resources: [
      {
        label: "GitHub",
        href: "https://github.com/Bouramdane/watch-live",
        external: true,
      },
      {
        label: "Source Code",
        href: "https://github.com/Bouramdane/watch-live",
        external: true,
      },
    ],
    Connect: [
      { label: "GitHub Profile", href: "https://github.com/abouramd", external: true },
    ],
  };

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                ▶
              </div>
              <span className="font-bold text-lg">Watch Live</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your destination for live sports streaming.
            </p>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center text-xs text-muted-foreground md:text-left">
              © {currentYear} Watch Live. All rights reserved. | Built with ❤️ by{" "}
              <Link
                href="https://github.com/abouramd"
                target="_blank"
                rel="noreferrer"
                className="font-medium hover:text-foreground transition-colors"
              >
                Abdelhay Bouramdane
              </Link>
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <Link
                href="https://github.com/Bouramdane/watch-live"
                target="_blank"
                rel="noreferrer"
                className="p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Watch Live",
            description: "Live sports streaming platform",
            url: "https://live-stream-snowy.vercel.app",
            creator: {
              "@type": "Person",
              name: "Abdelhay Bouramdane",
              url: "https://github.com/abouramd",
            },
          }),
        }}
      />
    </footer>
  );
}
