export default function Sitemap() {
  return null;
}

export const getServerSideProps: any = async (ctx: any) => {
  ctx.res.setHeader("Content-Type", "text/xml");
  const xml = await generateSitemap();
  ctx.res.write(xml);
  ctx.res.end();

  return {
    props: {},
  };
};

async function generateSitemap(): Promise<string> {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
          <loc>https://www.yourschoolsoftware.com/</loc>
          <lastmod>2023-12-01</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
      </url>
      <url>
          <loc>https://www.yourschoolsoftware.com/blog</loc>
          <lastmod>2023-12-01</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
      </url>
      <url>
          <loc>https://www.yourschoolsoftware.com/ebookPage</loc>
          <lastmod>2023-12-01</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
      </url>
      <url>
          <loc>https://www.yourschoolsoftware.com/ourTeam</loc>
          <lastmod>2023-12-01</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
      </url>
      <url>
          <loc>https://www.yourschoolsoftware.com/careerPage</loc>
          <lastmod>2023-12-01</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
      </url>
      <url>
          <loc>https://www.yourschoolsoftware.com/featuresTour</loc>
          <lastmod>2023-12-01</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
      </url>
      <url>
          <loc>https://www.yourschoolsoftware.com/pricing</loc>
          <lastmod>2023-12-01</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
      </url>
      <url>
          <loc>https://www.yourschoolsoftware.com/contactPage</loc>
          <lastmod>2023-12-01</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
      </url>
  </urlset>`;
}
