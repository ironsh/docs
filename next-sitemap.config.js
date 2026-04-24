/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://docs.iron.sh",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/_pagefind/"],
      },
    ],
  },
};
