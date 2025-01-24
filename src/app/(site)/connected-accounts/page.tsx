"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
	Github,
	Twitter,
	Mail,
	Calendar,
	MessageSquare,
	Cloud,
	AlertCircle,
} from "lucide-react";

interface ConnectedAccount {
	id: string;
	name: string;
	icon: React.ReactNode;
	status: "connected" | "not_connected";
	email?: string;
	lastSync?: string;
	description: string;
	category: "essential" | "productivity" | "communication" | "storage";
}

const accounts: ConnectedAccount[] = [
	{
		id: "google",
		name: "Google",
		icon: <Mail className="w-5 h-5" />,
		status: "connected",
		email: "user@example.com",
		lastSync: "2 hours ago",
		description: "Access your Google services and data",
		category: "essential",
	},
	{
		id: "github",
		name: "GitHub",
		icon: <Github className="w-5 h-5" />,
		status: "connected",
		email: "user@github.com",
		lastSync: "1 day ago",
		description: "Connect your GitHub repositories and activities",
		category: "essential",
	},
	{
		id: "twitter",
		name: "Twitter",
		icon: <Twitter className="w-5 h-5" />,
		status: "not_connected",
		description: "Share updates and engage with your audience",
		category: "communication",
	},
	{
		id: "calendar",
		name: "Calendar",
		icon: <Calendar className="w-5 h-5" />,
		status: "connected",
		lastSync: "30 minutes ago",
		description: "Sync your calendar events and meetings",
		category: "productivity",
	},
	{
		id: "slack",
		name: "Slack",
		icon: <MessageSquare className="w-5 h-5" />,
		status: "not_connected",
		description: "Collaborate with your team in real-time",
		category: "communication",
	},
	{
		id: "dropbox",
		name: "Dropbox",
		icon: <Cloud className="w-5 h-5" />,
		status: "not_connected",
		description: "Access your cloud storage and files",
		category: "storage",
	},
];

export default function ConnectedAccountsPage() {
	const [connectedAccounts, setConnectedAccounts] = useState(accounts);
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState<string | null>(null);

	const handleConnection = async (accountId: string) => {
		setIsLoading(accountId);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setConnectedAccounts((prev) =>
				prev.map((account) => {
					if (account.id === accountId) {
						return {
							...account,
							status:
								account.status === "connected" ? "not_connected" : "connected",
						};
					}
					return account;
				})
			);

			toast({
				title: "Success",
				description: `Account ${
					connectedAccounts.find((a) => a.id === accountId)?.status ===
					"connected"
						? "disconnected"
						: "connected"
				} successfully.`,
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to update connection. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(null);
		}
	};

	const categories = ["essential", "productivity", "communication", "storage"];

	return (
		<div className="w-full space-y-6">
			<Card className="border-yellow-500/20 bg-yellow-500/5">
				<CardContent className="p-6 flex items-start gap-4">
					<div className="p-3 bg-yellow-500/20 rounded-full">
						<AlertCircle className="w-6 h-6 text-yellow-500" />
					</div>
					<div className="space-y-1">
						<h3 className="font-medium">Account Permissions</h3>
						<p className="text-sm text-muted-foreground">
							Connected accounts will be able to access certain parts of your
							account. Review the permissions carefully.
						</p>
					</div>
				</CardContent>
			</Card>

			<div className="grid gap-6">
				{categories.map((category) => {
					const categoryAccounts = connectedAccounts.filter(
						(account) => account.category === category
					);

					if (categoryAccounts.length === 0) return null;

					return (
						<Card key={category}>
							<CardHeader>
								<CardTitle className="capitalize">
									{category} Integrations
								</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-6">
								{categoryAccounts.map((account) => (
									<div
										key={account.id}
										className="flex items-center justify-between space-x-4"
									>
										<div className="flex items-center space-x-4">
											<div className="p-2 bg-secondary rounded-lg">
												{account.icon}
											</div>
											<div className="space-y-1">
												<div className="flex items-center gap-2">
													<p className="font-medium">{account.name}</p>
													{account.status === "connected" && (
														<Badge
															variant="outline"
															className="bg-emerald-500/20 text-emerald-500"
														>
															Connected
														</Badge>
													)}
												</div>
												{account.email && (
													<p className="text-sm text-muted-foreground">
														{account.email}
													</p>
												)}
												{account.lastSync && account.status === "connected" && (
													<p className="text-xs text-muted-foreground">
														Last synced {account.lastSync}
													</p>
												)}
												<p className="text-sm text-muted-foreground">
													{account.description}
												</p>
											</div>
										</div>
										<Button
											variant={
												account.status === "connected" ? "outline" : "default"
											}
											onClick={() => handleConnection(account.id)}
											disabled={isLoading === account.id}
										>
											{isLoading === account.id
												? "Loading..."
												: account.status === "connected"
												? "Disconnect"
												: "Connect"}
										</Button>
									</div>
								))}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
