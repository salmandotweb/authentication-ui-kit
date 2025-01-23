"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";
import { RiLogoutCircleLine, RiMoneyDollarCircleFill } from "react-icons/ri";
import { RiMenuFill } from "react-icons/ri";
import { deleteCookie } from "cookies-next";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { TbHomeFilled } from "react-icons/tb";
import { MdAttachEmail } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { MdOutlineImportContacts } from "react-icons/md";
import { SiScrapbox } from "react-icons/si";
import { IoSettings } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import Image from "next/image";

type SidebarItem = {
	icon: React.ComponentType<any>;
	label: string;
	href: string;
	badge?: number | undefined;
};

export const sidebarGroups: { name: string; items: SidebarItem[] }[] = [
	{
		name: "Overview",
		items: [{ icon: TbHomeFilled, label: "Dashboard", href: "/dashboard" }],
	},
	{
		name: "Data Collection",
		items: [{ icon: SiScrapbox, label: "Scraping", href: "/scraping" }],
	},
	{
		name: "Email Operations",
		items: [
			{ icon: MdMarkEmailRead, label: "Verify Email", href: "/verify-email" },
			{
				icon: MdEmail,
				label: "Email Campaign",
				href: "/email-campaign",
			},
			{ icon: MdAttachEmail, label: "Connect Email", href: "/connect-email" },
		],
	},
	{
		name: "Contact Management",
		items: [
			{ icon: MdOutlineImportContacts, label: "Contacts", href: "/contacts" },
		],
	},
	{
		name: "Billing",
		items: [
			{ icon: RiMoneyDollarCircleFill, label: "Billing", href: "/billing" },
		],
	},
	{
		name: "System",
		items: [{ icon: IoSettings, label: "Settings", href: "/settings" }],
	},
];

const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const pathname = usePathname();

	const toggleSidebar = () => setIsCollapsed(!isCollapsed);

	const handleLogout = () => {
		deleteCookie("authToken");
		window.location.href = "/";
	};

	const updatedSidebarGroups = sidebarGroups.map((group) => {
		if (group.name === "Notifications") {
			return {
				...group,
				items: group.items.map((item) => ({
					...item,
					badge: undefined,
				})),
			};
		}
		return group;
	});

	const SidebarContent = ({ isMobile = false }) => (
		<>
			<div className="p-4 flex items-center justify-between">
				{(!isCollapsed || isMobile) && (
					<Link href="/">
						<div className="flex items-center gap-3">
							<Image
								src={siteConfig.logo}
								alt={siteConfig.name}
								width={28}
								height={28}
							/>
							<span className="text-xl font-bold">{siteConfig.name}.</span>
						</div>
					</Link>
				)}
				{!isMobile && (
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleSidebar}
						className="hover:bg-secondary hover:text-black"
					>
						{isCollapsed ? (
							<FiCornerUpRight className="h-4 w-4" />
						) : (
							<FiCornerUpLeft className="h-4 w-4" />
						)}
					</Button>
				)}
			</div>

			<ScrollArea className="flex-1">
				<nav className="space-y-4">
					{updatedSidebarGroups.map((group) => (
						<div key={group.name}>
							{(!isCollapsed || isMobile) && (
								<div className="px-4 py-2 text-xs font-semibold text-black/40 uppercase tracking-wider">
									{group.name}
								</div>
							)}
							{group.items.map((item) => (
								<div className="w-full px-4 my-2 relative" key={item.href}>
									<Link href={item.href}>
										<Button
											variant="ghost"
											className={cn(
												"w-full justify-start px-2",
												pathname === item.href
													? `font-medium hover:bg-secondary/70 bg-secondary/70`
													: "hover:bg-secondary/70"
											)}
										>
											<item.icon
												className={cn(
													"h-5 w-5",
													isCollapsed && !isMobile ? "mr-0" : "mr-2"
												)}
											/>
											{(!isCollapsed || isMobile) && (
												<span className="text-base font-normal">
													{item.label}
													{item.badge && (
														<Badge variant="destructive" className="ml-2">
															{item.badge}
														</Badge>
													)}
												</span>
											)}

											{pathname === item.href && !isCollapsed && (
												<FaAngleRight className="h-3 w-3 ml-auto" />
											)}

											{pathname === item.href && !isCollapsed && (
												<div className="absolute left-0 top-0 h-full w-2 bg-primary rounded-tr-2xl rounded-br-2xl" />
											)}
										</Button>
									</Link>
								</div>
							))}
						</div>
					))}
				</nav>
			</ScrollArea>

			<div className="px-3 py-4 border-t">
				<Button
					variant="ghost"
					className={cn("w-full justify-start hover:bg-secondary/70")}
					onClick={handleLogout}
				>
					<RiLogoutCircleLine
						className={cn(
							"h-4 w-4",
							isCollapsed && !isMobile ? "mr-0" : "mr-2"
						)}
					/>
					{(!isCollapsed || isMobile) && (
						<span className="text-base font-medium">Logout</span>
					)}
				</Button>
			</div>
		</>
	);

	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="default"
						size="sm"
						className="fixed top-4 left-6 z-50 md:hidden"
					>
						<RiMenuFill className="h-4 w-4" />
					</Button>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="p-0 bg-primary text-primary bg-white w-64"
				>
					<SidebarContent isMobile={true} />
				</SheetContent>
			</Sheet>

			<motion.div
				className={cn(
					"fixed md:relative inset-y-0 h-full left-0 z-40 hidden md:flex flex-col bg-white border-r",
					isCollapsed ? "w-16" : "w-[300px]"
				)}
				animate={{ width: isCollapsed ? 64 : 300 }}
				transition={{ duration: 0.3 }}
			>
				<SidebarContent />
			</motion.div>
		</>
	);
};

export default Sidebar;
