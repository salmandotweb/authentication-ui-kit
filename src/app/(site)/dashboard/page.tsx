"use client";

import { Revenue } from "./components/revenue";

export default function DashboardPage() {
	return (
		<div className="w-full h-full flex flex-col items-start gap-4 sm:gap-6">
			<Revenue />
		</div>
	);
}
