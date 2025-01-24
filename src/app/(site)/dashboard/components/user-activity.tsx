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

const activities = [
	{
		id: 1,
		user: "John Doe",
		action: "Created a new project",
		time: "2 minutes ago",
		type: "create",
	},
	{
		id: 2,
		user: "Sarah Smith",
		action: "Updated profile settings",
		time: "5 minutes ago",
		type: "update",
	},
	{
		id: 3,
		user: "Michael Brown",
		action: "Completed onboarding",
		time: "10 minutes ago",
		type: "complete",
	},
	{
		id: 4,
		user: "Emily Wilson",
		action: "Invited team members",
		time: "15 minutes ago",
		type: "invite",
	},
	{
		id: 5,
		user: "David Lee",
		action: "Generated monthly report",
		time: "25 minutes ago",
		type: "generate",
	},
	{
		id: 6,
		user: "Lisa Anderson",
		action: "Upgraded to premium plan",
		time: "30 minutes ago",
		type: "upgrade",
	},
];

const getActivityColor = (type: string) => {
	switch (type) {
		case "create":
			return "bg-green-500";
		case "update":
			return "bg-blue-500";
		case "complete":
			return "bg-purple-500";
		case "invite":
			return "bg-yellow-500";
		case "generate":
			return "bg-orange-500";
		case "upgrade":
			return "bg-pink-500";
		default:
			return "bg-gray-500";
	}
};

export function UserActivity() {
	return (
		<Card className="w-full h-full">
			<CardHeader>
				<CardTitle>User Activity</CardTitle>
				<CardDescription>Recent user actions and events</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[300px] pr-4">
					<div className="relative">
						<div className="absolute left-2 top-0 bottom-0 w-[2px] bg-border" />
						<div className="space-y-6">
							{activities.map((activity) => (
								<div
									key={activity.id}
									className="relative flex items-start gap-4 pl-8"
								>
									<div
										className={`absolute left-0 p-1.5 rounded-full ${getActivityColor(
											activity.type
										)}`}
									/>
									<div className="flex flex-col gap-1">
										<div className="flex items-center gap-2">
											<span className="font-medium">{activity.user}</span>
											<Badge variant="secondary" className="text-xs">
												{activity.time}
											</Badge>
										</div>
										<p className="text-sm text-muted-foreground">
											{activity.action}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
