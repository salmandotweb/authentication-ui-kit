"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
	Laptop,
	Smartphone,
	Tablet,
	Monitor,
	AlertCircle,
	Globe,
	Clock,
	MapPin,
} from "lucide-react";

interface Session {
	id: string;
	deviceType: "desktop" | "mobile" | "tablet" | "unknown";
	deviceName: string;
	browser: string;
	location: string;
	ipAddress: string;
	lastActive: string;
	isCurrentDevice: boolean;
}

const getDeviceIcon = (type: Session["deviceType"]) => {
	switch (type) {
		case "desktop":
			return <Monitor className="w-5 h-5" />;
		case "mobile":
			return <Smartphone className="w-5 h-5" />;
		case "tablet":
			return <Tablet className="w-5 h-5" />;
		default:
			return <Laptop className="w-5 h-5" />;
	}
};

const sessions: Session[] = [
	{
		id: "1",
		deviceType: "desktop",
		deviceName: "MacBook Pro",
		browser: "Chrome 120.0",
		location: "San Francisco, US",
		ipAddress: "192.168.1.1",
		lastActive: "Active now",
		isCurrentDevice: true,
	},
	{
		id: "2",
		deviceType: "mobile",
		deviceName: "iPhone 13",
		browser: "Safari Mobile 17.0",
		location: "San Francisco, US",
		ipAddress: "192.168.1.2",
		lastActive: "2 hours ago",
		isCurrentDevice: false,
	},
	{
		id: "3",
		deviceType: "tablet",
		deviceName: "iPad Pro",
		browser: "Safari 17.0",
		location: "Los Angeles, US",
		ipAddress: "192.168.1.3",
		lastActive: "1 day ago",
		isCurrentDevice: false,
	},
	{
		id: "4",
		deviceType: "desktop",
		deviceName: "Windows PC",
		browser: "Firefox 122.0",
		location: "New York, US",
		ipAddress: "192.168.1.4",
		lastActive: "3 days ago",
		isCurrentDevice: false,
	},
];

export default function SessionManagementPage() {
	const [activeSessions, setActiveSessions] = useState(sessions);
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState<string | null>(null);

	const handleRevoke = async (sessionId: string) => {
		setIsLoading(sessionId);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setActiveSessions((prev) =>
				prev.filter((session) => session.id !== sessionId)
			);

			toast({
				title: "Session Revoked",
				description: "The session has been successfully terminated.",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to revoke session. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(null);
		}
	};

	const handleRevokeAll = async () => {
		setIsLoading("all");
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setActiveSessions((prev) =>
				prev.filter((session) => session.isCurrentDevice)
			);

			toast({
				title: "All Sessions Revoked",
				description: "All other sessions have been terminated.",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to revoke all sessions. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(null);
		}
	};

	return (
		<div className="w-full space-y-6">
			<Card className="border-yellow-500/20 bg-yellow-500/5">
				<CardContent className="p-6 flex items-start gap-4">
					<div className="p-3 bg-yellow-500/20 rounded-full">
						<AlertCircle className="w-6 h-6 text-yellow-500" />
					</div>
					<div className="space-y-1">
						<h3 className="font-medium">Security Notice</h3>
						<p className="text-sm text-muted-foreground">
							Signing out of a device will terminate the session immediately.
							The user will need to sign in again to access their account.
						</p>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Device Sessions</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-6">
					{activeSessions.map((session) => (
						<div
							key={session.id}
							className="flex items-start justify-between space-x-4"
						>
							<div className="flex items-start space-x-4">
								<div className="p-2 bg-secondary rounded-lg">
									{getDeviceIcon(session.deviceType)}
								</div>
								<div className="space-y-1">
									<div className="flex items-center gap-2">
										<p className="font-medium">{session.deviceName}</p>
										{session.isCurrentDevice && (
											<Badge
												variant="outline"
												className="bg-primary/20 text-primary"
											>
												Current Device
											</Badge>
										)}
									</div>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<Globe className="w-4 h-4" />
											<span>{session.browser}</span>
										</div>
										<div className="flex items-center gap-1">
											<MapPin className="w-4 h-4" />
											<span>{session.location}</span>
										</div>
										<div className="flex items-center gap-1">
											<Clock className="w-4 h-4" />
											<span>{session.lastActive}</span>
										</div>
									</div>
									<p className="text-sm text-muted-foreground">
										IP: {session.ipAddress}
									</p>
								</div>
							</div>
							{!session.isCurrentDevice && (
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleRevoke(session.id)}
									disabled={isLoading === session.id}
								>
									{isLoading === session.id ? "Revoking..." : "Revoke Access"}
								</Button>
							)}
						</div>
					))}
				</CardContent>
			</Card>

			<div className="flex justify-end w-full">
				<Button
					variant="destructive"
					onClick={handleRevokeAll}
					disabled={isLoading !== null}
				>
					Sign Out All Devices
				</Button>
			</div>
		</div>
	);
}
