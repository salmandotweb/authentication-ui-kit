import * as React from "react";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Settings01Icon,
	DashboardCircleSettingsIcon,
	UserSettings01Icon,
	AccountSetting03Icon,
	SearchingIcon,
} from "hugeicons-react";
import { useRouter } from "next/navigation";

const items = [
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

export function SearchCommand() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="flex items-center w-[230px] text-left font-normal bg-gray-200 hover:bg-gray-300 text-black rounded-full px-3 py-2"
			>
				<SearchingIcon className="mr-2 h-4 w-4" />
				<span className="hidden sm:inline text-sm">Search... (⌘K)</span>
			</button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Pages">
							{items.map((item) => (
								<CommandItem
									key={item.href}
									onSelect={() => {
										router.push(item.href);
										setOpen(false);
									}}
								>
									{item.icon}
									<span>{item.label}</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	);
}
