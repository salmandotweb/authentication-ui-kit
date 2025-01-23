import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { ReactNode } from "react";

export default async function SiteLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<main className="w-full h-screen flex items-start flex-col md:flex-row bg-white">
			<Sidebar />
			<div className="w-full h-full flex flex-col">
				<Topbar />
				<div className="w-full h-full overflow-y-auto overflow-x-hidden bg-gray-100 flex flex-col px-2 sm:px-4 py-3 items-start">
					{children}
				</div>
			</div>
		</main>
	);
}
