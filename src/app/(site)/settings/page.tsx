"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Palette, Shield, User, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useUser from "@/hooks/useUser";
import { ProfileSettings } from "./components/profile-settings";
import { NotificationSettings } from "./components/notification-settings";
import { SecuritySettings } from "./components/security-settings";
import { AppearanceSettings } from "./components/appearance-settings";
import { BillingSettings } from "./components/billing-settings";

const settingsSections = [
	{
		id: "profile",
		label: "Profile",
		icon: <User className="w-4 h-4" />,
	},
	{
		id: "notifications",
		label: "Notifications",
		icon: <Bell className="w-4 h-4" />,
	},
	{
		id: "security",
		label: "Security",
		icon: <Shield className="w-4 h-4" />,
	},
	{
		id: "appearance",
		label: "Appearance",
		icon: <Palette className="w-4 h-4" />,
	},
	{
		id: "billing",
		label: "Billing",
		icon: <Wallet className="w-4 h-4" />,
	},
];

export default function SettingsPage() {
	const [activeSection, setActiveSection] = useState("profile");
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const user = useUser();

	const handleSave = async () => {
		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast({
				title: "Settings updated",
				description: "Your settings have been successfully updated.",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to update settings. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full space-y-6">
			<div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-10rem)]">
				<Card className="md:w-64 w-full h-fit">
					<CardContent className="p-4">
						<nav className="space-y-2">
							{settingsSections.map((section) => (
								<Button
									key={section.id}
									variant={activeSection === section.id ? "default" : "ghost"}
									className="w-full justify-start"
									onClick={() => setActiveSection(section.id)}
								>
									{section.icon}
									<span className="ml-2">{section.label}</span>
								</Button>
							))}
						</nav>
					</CardContent>
				</Card>

				<div className="flex-1 overflow-y-auto">
					{activeSection === "profile" && (
						<ProfileSettings
							user={user}
							onSave={handleSave}
							isLoading={isLoading}
						/>
					)}
					{activeSection === "notifications" && (
						<NotificationSettings onSave={handleSave} isLoading={isLoading} />
					)}
					{activeSection === "security" && (
						<SecuritySettings onSave={handleSave} isLoading={isLoading} />
					)}
					{activeSection === "appearance" && (
						<AppearanceSettings onSave={handleSave} isLoading={isLoading} />
					)}
					{activeSection === "billing" && (
						<BillingSettings onSave={handleSave} isLoading={isLoading} />
					)}
				</div>
			</div>
		</div>
	);
}
