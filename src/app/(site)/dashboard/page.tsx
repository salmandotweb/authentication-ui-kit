"use client";

import { Revenue } from "./components/revenue";
import { ActiveUsers } from "./components/active-users";
import { SalesOverview } from "./components/sales-overview";
import { TopProducts } from "./components/top-products";
import { ConversionRate } from "./components/conversion-rate";
import { UserActivity } from "./components/user-activity";
import Profile from "./components/profile";
import useUser from "@/hooks/useUser";

export default function DashboardPage() {
	const user = useUser();

	return (
		<div className="w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 pb-6">
			<div className="md:col-span-3">
				<Revenue />
			</div>
			<ConversionRate />
			<ActiveUsers />
			<Profile
				user={{
					...user,
					position: "Co-Founder",
					totalSales: 100,
					totalRevenue: 100000,
				}}
			/>
			<UserActivity />
			<TopProducts />
			<SalesOverview />
		</div>
	);
}
