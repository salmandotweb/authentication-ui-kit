"use client";

import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import {
	AccountSetting03Icon,
	DashboardCircleSettingsIcon,
	Notification01Icon,
	SearchingIcon,
	Settings01Icon,
	UserSettings01Icon,
} from "hugeicons-react";
import { Button } from "./ui/button";
import { UserCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SearchCommand } from "./search-command";
import { NotificationsDropdown } from "./notifications";

const links = [
	{
		icon: <DashboardCircleSettingsIcon className="w-4 h-4" />,
		label: "Dashboard",
		href: "/dashboard",
	},
	{
		icon: <Settings01Icon className="w-4 h-4" />,
		label: "Settings",
		href: "/settings",
	},
	{
		icon: <UserSettings01Icon className="w-4 h-4" />,
		label: "Connected Accounts",
		href: "/connected-accounts",
	},
	{
		icon: <AccountSetting03Icon className="w-4 h-4" />,
		label: "Session Management",
		href: "/session-management",
	},
];

const Topbar = () => {
	const pathname = usePathname();

	const isActive = (href: string) => {
		return pathname === href;
	};

	return (
		<div className="w-full p-2 sm:p-4 grid grid-cols-4 gap-3">
			<div>
				<div className="flex w-fit items-center gap-2 bg-white rounded-3xl px-4 py-2">
					<Image
						src={siteConfig.logo}
						alt={siteConfig.name}
						width={28}
						height={28}
					/>
					<h1 className="text-2xl font-semibold">{siteConfig.name}</h1>
				</div>
			</div>

			<div className="col-span-2">
				<div className="flex items-center gap-2 bg-white w-fit rounded-[40px] px-4 py-2">
					{links.map((link) => (
						<Link key={link.href} href={link.href}>
							<Button
								variant="ghost"
								icon={link.icon}
								className={cn(
									"text-md",
									isActive(link.href) &&
										"text-primary hover:text-primary bg-primary/20",
									"hover:text-primary hover:bg-primary/20"
								)}
							>
								{link.label}
							</Button>
						</Link>
					))}
				</div>
			</div>

			<div className="w-full col-span-1 flex items-center justify-end">
				<div className="flex items-center w-fit gap-2 bg-white rounded-[40px] px-4 py-2">
					<SearchCommand />

					<NotificationsDropdown />

					<Button variant="secondary" className="bg-gray-200 hover:bg-gray-300">
						<UserCircle2 className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
