"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import { Revenue } from "./components/revenue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
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

				<div className="flex flex-col w-full items-center justify-center gap-4 text-white">
					<Avatar className="w-32 h-32 rounded-full">
						<AvatarImage src="https://github.com/salmandotweb.png" />
						<AvatarFallback>SN</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-center justify-center">
						<p className="text-md font-semibold">Shipcrew Co-Founder</p>
						<p className="text-md font-normal">salmandotweb@gmail.com</p>
					</div>

					<div className="grid grid-cols-2 gap-2 w-full text-primary">
						<div className="w-full rounded-2xl bg-white p-4 flex items-center justify-center flex-col h-[100px]">
							<p className="text-sm font-medium">Total Sales</p>
							<p className="text-md font-semibold">100</p>
						</div>
						<div className="w-full rounded-2xl bg-white p-4 flex items-center justify-center flex-col h-[100px]">
							<p className="text-sm font-medium">Total Revenue</p>
							<p className="text-md font-semibold">$100,000</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
