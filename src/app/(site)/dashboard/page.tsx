"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import { Revenue } from "./components/revenue";
import Profile from "./components/profile";
import useUser from "@/hooks/useUser";

export default function DashboardPage() {
	const user = useUser();

	return (
		<div className="w-full h-full flex flex-col items-start gap-4 sm:gap-6">
			<Revenue />

			<div className="w-[360px] h-[420px] bg-primary/70 rounded-3xl p-3 flex flex-col items-center justify-between">
				<div className="w-full px-3 py-2 rounded-full bg-white/10 text-white flex items-center justify-between cursor-pointer hover:bg-white/20 transition-all duration-300">
					<p className="text-sm font-medium">Your Profile</p>
					<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
						<PersonIcon className="w-4 h-4" />
					</div>
				</div>

				<Profile
					user={{
						...user,
						position: "Co-Founder",
						totalSales: 100,
						totalRevenue: 100000,
					}}
				/>
			</div>
		</div>
	);
}
