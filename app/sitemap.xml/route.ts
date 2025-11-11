import { getSports } from "@/lib/api";

export async function GET() {
  const sports = await getSports();

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://live-stream-snowy.vercel.app";

  const urls = [
    {
      url: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: "hourly",
      priority: "1.0",
    },
    ...sports.map((sport) => ({
      url: `${baseUrl}/sports/${sport.id}`,
      lastmod: new Date().toISOString(),
      changefreq: "hourly",
      priority: "0.8",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (item) => `
  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>
  `
    )
    .join("")}
</urlset>
  `;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
