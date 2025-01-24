import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface NotificationSettingsProps {
	onSave: () => Promise<void>;
	isLoading: boolean;
}

export function NotificationSettings({
	onSave,
	isLoading,
}: NotificationSettingsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Notification Preferences</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					{[
						{
							title: "Email Notifications",
							description:
								"Receive email notifications about your account activity",
						},
						{
							title: "Product Updates",
							description: "Get notified about new features and improvements",
						},
						{
							title: "Security Alerts",
							description: "Receive alerts about suspicious activity",
						},
						{
							title: "Marketing Communications",
							description: "Receive news, updates, and promotions",
						},
					].map((item, index) => (
						<div
							key={index}
							className="flex items-center justify-between py-3 border-b last:border-0"
						>
							<div className="space-y-0.5">
								<h3 className="text-sm font-medium">{item.title}</h3>
								<p className="text-sm text-muted-foreground">
									{item.description}
								</p>
							</div>
							<Switch />
						</div>
					))}
				</div>

				<div className="flex justify-end">
					<Button onClick={onSave} disabled={isLoading}>
						{isLoading ? "Saving..." : "Save Preferences"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
