import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { siteConfig } from "@/config/site";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";

// import ogImage from "./opengraph-image.png";
// import twitterOgImage from "./twitter-opengraph-image.png";

const font = Outfit({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: {
		default: "Auth UI Kit",
		template: `%s | Auth UI Kit`,
	},
	description:
		"Modern authentication UI kit built with Next.js, Tailwind CSS and Shadcn UI",
	metadataBase: new URL("https://auth-ui-kit.vercel.app"),
	keywords: [
		"authentication",
		"ui kit",
		"next.js",
		"react",
		"tailwind css",
		"shadcn ui",
		"auth flows",
		"login",
		"signup",
		"password reset",
	],
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://auth-ui-kit.vercel.app",
		title: "Auth UI Kit",
		description:
			"Modern authentication UI kit built with Next.js, Tailwind CSS and Shadcn UI",
		siteName: "Auth UI Kit",
	},
	twitter: {
		card: "summary_large_image",
		title: "Auth UI Kit",
		description:
			"Modern authentication UI kit built with Next.js, Tailwind CSS and Shadcn UI",
		creator: "@salmandotweb",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: `/site.webmanifest`,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<ReactQueryProvider>
						<GoogleOAuthProvider
							clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
						>
							{children}
						</GoogleOAuthProvider>
					</ReactQueryProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
