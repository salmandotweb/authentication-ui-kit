import * as React from "react";
import {
	Bell,
	CheckCheck,
	Mail,
	MessageSquare,
	Package,
	ShieldCheck,
	UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Notification01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

type Notification = {
	id: string;
	title: string;
	description: string;
	icon: React.ReactNode;
	timestamp: string;
	read: boolean;
};

const notifications: Notification[] = [
	{
		id: "1",
		title: "New Message",
		description: "You have a new message from Sarah",
		icon: <MessageSquare className="h-4 w-4" />,
		timestamp: "2 min ago",
		read: false,
	},
	{
		id: "2",
		title: "Account Security",
		description: "Your password was changed successfully",
		icon: <ShieldCheck className="h-4 w-4" />,
		timestamp: "1 hour ago",
		read: false,
	},
	{
		id: "3",
		title: "New Connection",
		description: "John Doe started following you",
		icon: <UserPlus className="h-4 w-4" />,
		timestamp: "3 hours ago",
		read: true,
	},
	{
		id: "4",
		title: "Email Verified",
		description: "Your email has been verified",
		icon: <Mail className="h-4 w-4" />,
		timestamp: "1 day ago",
		read: true,
	},
	{
		id: "5",
		title: "Package Delivered",
		description: "Your package has been delivered",
		icon: <Package className="h-4 w-4" />,
		timestamp: "2 days ago",
		read: true,
	},
];

export function NotificationsDropdown() {
	const [unreadCount, setUnreadCount] = React.useState(
		notifications.filter((n) => !n.read).length
	);

	const markAllAsRead = () => {
		setUnreadCount(0);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="secondary"
					className="bg-gray-200 hover:bg-gray-300 relative"
				>
					<Notification01Icon className="h-4 w-4" />
					{unreadCount > 0 && (
						<span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
							{unreadCount}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80" align="end" forceMount>
				<DropdownMenuLabel className="flex items-center justify-between">
					<span>Notifications</span>
					{unreadCount > 0 && (
						<Button
							variant="ghost"
							className="h-auto p-0 text-xs text-primary"
							onClick={markAllAsRead}
						>
							<CheckCheck className="mr-1 h-3 w-3" />
							Mark all as read
						</Button>
					)}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className="max-h-[300px] overflow-auto">
					{notifications.map((notification) => (
						<DropdownMenuItem key={notification.id} className="gap-4 p-4">
							<div
								className={cn(
									"flex h-8 w-8 items-center justify-center rounded-full",
									!notification.read ? "bg-primary/20" : "bg-muted"
								)}
							>
								{notification.icon}
							</div>
							<div className="flex flex-col gap-1">
								<p className="text-sm font-medium leading-none">
									{notification.title}
								</p>
								<p className="text-xs text-muted-foreground">
									{notification.description}
								</p>
								<p className="text-xs font-medium text-muted-foreground">
									{notification.timestamp}
								</p>
							</div>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
