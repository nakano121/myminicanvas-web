/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://myminicanvas.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    additionalSitemaps: ["https://myminicanvas.com/sitemap.xml"],
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
};
