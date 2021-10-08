const siteUrl = "https://diariocivitas.com"
module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    priority: 0.7,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${siteUrl}/server-sitemap.xml`,
        ]
    },
    additionalSitemaps: [
        `${siteUrl}/sitemap.xml`,
        `${siteUrl}/server-sitemap.xml`
    ]
  }