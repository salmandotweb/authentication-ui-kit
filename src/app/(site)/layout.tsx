import Topbar from "@/components/topbar";
import { ReactNode } from "react";

export default async function SiteLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<main className="w-full h-screen flex items-start flex-col bg-white max-w-[1800px] mx-auto">
			<Topbar />
			<div className="w-full h-full overflow-y-auto overflow-x-hidden bg-gray-100 flex flex-col px-2 sm:px-4 pb-3 py-6 items-start">
				{children}
			</div>
		</main>
	);
}
