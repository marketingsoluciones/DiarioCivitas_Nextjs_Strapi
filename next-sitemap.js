const siteUrl = "https://diariocivitas.com"
module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    additionalSitemaps: [
        `${siteUrl}/sitemap.xml`,
        `${siteUrl}/server-sitemap.xml`
    ]
  }