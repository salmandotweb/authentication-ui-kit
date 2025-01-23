export type SiteConfig = {
   name: string
   description: string
   url: string
   logo: string
   siteStatus: SiteStatus
   links: {
      twitter: string
   }
}

export type SiteStatus = "coming soon" | "maintainance" | "live"

export const siteConfig: SiteConfig = {
   name: "Boilerplate",
   description:
      "A Next.js boilerplate with authentication and more",
   url: "https://example.com",
   logo: "/images/logo.png",
   siteStatus: "live",
   links: {
      twitter: "",
   },
}