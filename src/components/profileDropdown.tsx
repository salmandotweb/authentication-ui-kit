"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCrown } from "react-icons/fa6";
import { deleteCookie } from "cookies-next";
import { User } from "@/interfaces/user";

const ProfileDropdown = ({ user, isPro }: { user: User; isPro?: boolean }) => {
	const handleLogout = () => {
		deleteCookie("authToken");
		window.location.href = "/";
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className={`relative z-10 h-8 w-8 rounded-full`}
				>
					{isPro && (
						<FaCrown className="absolute -top-4 right-[6px] z-50 h-5 w-5 text-yellow-400" />
					)}
					<Avatar className="h-8 w-8">
						<AvatarImage src={user?.avatarUrl!} alt={user?.email!} />
						<AvatarFallback>
							{user?.email
								?.split(" ")
								.map((n: any) => n[0]?.toUpperCase() + n[1]?.toUpperCase())}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="flex items-center justify-between gap-2 text-sm font-medium leading-none">
							{user?.firstName}
							{isPro && (
								<span className="text-xs font-semibold text-primary">Pro</span>
							)}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href="/dashboard">
						<DropdownMenuItem>Dashboard</DropdownMenuItem>
					</Link>
					<Link href="/scraping">
						<DropdownMenuItem>Scraping</DropdownMenuItem>
					</Link>
					<Link href="/verify-email">
						<DropdownMenuItem>Verify Email</DropdownMenuItem>
					</Link>
					<Link href="/email-campaign">
						<DropdownMenuItem>Email Campaign</DropdownMenuItem>
					</Link>
					<Link href="/connect-email">
						<DropdownMenuItem>Connect Email</DropdownMenuItem>
					</Link>
					<Link href="/contacts">
						<DropdownMenuItem>Contacts</DropdownMenuItem>
					</Link>
					<Link href="/settings">
						<DropdownMenuItem>Settings</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
