/** @type {import('next-sitemap').IConfig} */

/** Without additional '/' on the end, e.g. https://theodorusclarence.com */
// FIXME: make sure the siteURL is correct
const siteURL = process.env.NEXT_PUBLIC_APP_URL;

module.exports = {
	siteUrl: siteURL,
	generateRobotsTxt: true,
	sitemapSize: 7000,
	changefreq: "daily",
	priority: 0.7,
	exclude: ["/api/*"],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				disallow: "/", // FIXME: when in production
			},
		],
	},
};
