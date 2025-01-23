"use client";

import { TbBasketSearch } from "react-icons/tb";
import { Button } from "./ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sidebarGroups } from "./sidebar";
import ProfileDropdown from "./profileDropdown";
import Upgrade from "./upgrade";
import { useApiQuery } from "@/hooks/useApi";
import { Response } from "@/interfaces/response";
import { ClipLoader } from "react-spinners";
import { User } from "@/interfaces/user";

const Topbar = () => {
	const [open, setOpen] = useState(false);

	const { data: userData, isFetching: fetchingUser } = useApiQuery<
		Response<User>
	>(["user"], "/users/me");

	const isPro = false;

	const router = useRouter();

	const handleSearch = (command: string) => {
		setOpen(false);
		if (command.trim()) {
			router.push(command);
		}
	};

	return (
		<div className="w-full bg-white p-2 sm:p-4 flex items-center justify-between border-b">
			<div className="flex-1 max-w-xl pl-14 md:pl-0">
				<Button
					variant="default"
					className="justify-start text-left font-normal bg-gray-100 hover:bg-gray-200 text-black w-full max-w-[300px]"
					onClick={() => setOpen(true)}
				>
					<TbBasketSearch className="mr-2 h-4 w-4" />
					<span className="hidden sm:inline">Search...</span>
				</Button>
			</div>

			<div className="flex items-center justify-end gap-2 sm:gap-4">
				{!isPro && <Upgrade />}
				{fetchingUser ? (
					<ClipLoader size={13} />
				) : (
					<p className="text-xs sm:text-sm font-medium hidden lg:block">
						Hi, {userData?.data?.firstName} 👋
					</p>
				)}
				<ProfileDropdown user={userData?.data!} isPro={isPro} />
			</div>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{sidebarGroups.map((group) => (
						<CommandGroup key={group.name} heading={group.name}>
							{group.items.map((item) => (
								<CommandItem
									key={item.href}
									onSelect={() => handleSearch(item.href)}
								>
									<item.icon className="mr-2 h-5 w-4" />
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					))}
				</CommandList>
			</CommandDialog>
		</div>
	);
};

export default Topbar;
