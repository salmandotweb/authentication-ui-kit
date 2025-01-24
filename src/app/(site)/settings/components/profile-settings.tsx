import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/interfaces/user";

interface ProfileSettingsProps {
	user: User;
	onSave: () => Promise<void>;
	isLoading: boolean;
}

export function ProfileSettings({
	user,
	onSave,
	isLoading,
}: ProfileSettingsProps) {
	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Profile Information</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex items-center gap-6">
						<Avatar className="w-20 h-20">
							<AvatarImage src={user.avatarUrl || ""} />
							<AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
						</Avatar>
						<Button variant="outline">Change Avatar</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">First Name</label>
							<Input defaultValue={user.firstName} />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Last Name</label>
							<Input defaultValue={user.lastName} />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Email</label>
							<Input defaultValue={user.email} type="email" />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Phone</label>
							<Input placeholder="+1 (555) 000-0000" />
						</div>
					</div>

					<div className="flex justify-end">
						<Button onClick={onSave} disabled={isLoading}>
							{isLoading ? "Saving..." : "Save Changes"}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
