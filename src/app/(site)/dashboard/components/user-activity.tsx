"use client";

import * as React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	PlusCircle,
	RefreshCw,
	CheckCircle2,
	Users,
	BarChart3,
	Crown,
	Activity,
} from "lucide-react";

const activities = [
	{
		id: 1,
		user: "John Doe",
		action: "Created a new project",
		time: "2 minutes ago",
		type: "create",
		avatar: "J",
	},
	{
		id: 2,
		user: "Sarah Smith",
		action: "Updated profile settings",
		time: "5 minutes ago",
		type: "update",
		avatar: "S",
	},
	{
		id: 3,
		user: "Michael Brown",
		action: "Completed onboarding",
		time: "10 minutes ago",
		type: "complete",
		avatar: "M",
	},
	{
		id: 4,
		user: "Emily Wilson",
		action: "Invited team members",
		time: "15 minutes ago",
		type: "invite",
		avatar: "E",
	},
	{
		id: 5,
		user: "David Lee",
		action: "Generated monthly report",
		time: "25 minutes ago",
		type: "generate",
		avatar: "D",
	},
	{
		id: 6,
		user: "Lisa Anderson",
		action: "Upgraded to premium plan",
		time: "30 minutes ago",
		type: "upgrade",
		avatar: "L",
	},
];

const getActivityColor = (type: string) => {
	switch (type) {
		case "create":
			return "bg-emerald-500/20 text-emerald-500";
		case "update":
			return "bg-blue-500/20 text-blue-500";
		case "complete":
			return "bg-purple-500/20 text-purple-500";
		case "invite":
			return "bg-yellow-500/20 text-yellow-500";
		case "generate":
			return "bg-orange-500/20 text-orange-500";
		case "upgrade":
			return "bg-pink-500/20 text-pink-500";
		default:
			return "bg-gray-500/20 text-gray-500";
	}
};

const getActivityIcon = (type: string) => {
	switch (type) {
		case "create":
			return <PlusCircle className="h-4 w-4" />;
		case "update":
			return <RefreshCw className="h-4 w-4" />;
		case "complete":
			return <CheckCircle2 className="h-4 w-4" />;
		case "invite":
			return <Users className="h-4 w-4" />;
		case "generate":
			return <BarChart3 className="h-4 w-4" />;
		case "upgrade":
			return <Crown className="h-4 w-4" />;
		default:
			return <Activity className="h-4 w-4" />;
	}
};

export function UserActivity() {
	return (
		<Card className="w-full h-[420px]">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<CardTitle>User Activity</CardTitle>
						<CardDescription>Recent user actions</CardDescription>
					</div>
					<Badge variant="secondary" className="px-4">
						{activities.length} Activities
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[300px] pr-4">
					<div className="space-y-4">
						{activities.map((activity) => (
							<div
								key={activity.id}
								className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
							>
								<div
									className={cn(
										"flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
										getActivityColor(activity.type)
									)}
								>
									{getActivityIcon(activity.type)}
								</div>
								<div className="flex flex-col gap-1">
									<div className="flex items-center gap-2">
										<span className="font-medium">{activity.user}</span>
										<span className="text-xs text-muted-foreground">•</span>
										<span className="text-xs text-muted-foreground">
											{activity.time}
										</span>
									</div>
									<p className="text-sm text-muted-foreground">
										{activity.action}
									</p>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
