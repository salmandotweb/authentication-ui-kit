import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone, Key } from "lucide-react";
import { PasswordChangeDialog } from "@/components/password-change-dialog";

interface SecuritySettingsProps {
	onSave: () => Promise<void>;
	isLoading: boolean;
}

export function SecuritySettings({ onSave, isLoading }: SecuritySettingsProps) {
	const handlePasswordChange = async (values: {
		currentPassword: string;
		newPassword: string;
		confirmPassword: string;
	}) => {
		// Call API to update password
		console.log("Password change values:", values);
		await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
	};

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Two-Factor Authentication</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<h3 className="text-sm font-medium">Authenticator App</h3>
							<p className="text-sm text-muted-foreground">
								Use an authenticator app to generate one-time codes
							</p>
						</div>
						<Badge
							variant="outline"
							className="bg-emerald-500/20 text-emerald-500"
						>
							Enabled
						</Badge>
					</div>
					<Button variant="outline" className="w-full">
						<Smartphone className="w-4 h-4 mr-2" />
						Reconfigure 2FA
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Password</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-muted-foreground">
						Last changed 3 months ago
					</p>
					<PasswordChangeDialog onPasswordChange={handlePasswordChange} />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Active Sessions</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{[
						{
							device: "MacBook Pro",
							location: "San Francisco, CA",
							lastActive: "Active now",
							isCurrentDevice: true,
						},
						{
							device: "iPhone 13",
							location: "San Francisco, CA",
							lastActive: "2 hours ago",
							isCurrentDevice: false,
						},
					].map((session, index) => (
						<div
							key={index}
							className="flex items-center justify-between py-3 border-b last:border-0"
						>
							<div className="space-y-1">
								<div className="flex items-center gap-2">
									<h3 className="text-sm font-medium">{session.device}</h3>
									{session.isCurrentDevice && (
										<Badge variant="outline" className="bg-primary/20">
											Current
										</Badge>
									)}
								</div>
								<p className="text-sm text-muted-foreground">
									{session.location} • {session.lastActive}
								</p>
							</div>
							{!session.isCurrentDevice && (
								<Button variant="outline" size="sm">
									Revoke
								</Button>
							)}
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
