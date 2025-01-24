import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

interface AppearanceSettingsProps {
	onSave: () => Promise<void>;
	isLoading: boolean;
}

export function AppearanceSettings({
	onSave,
	isLoading,
}: AppearanceSettingsProps) {
	const { theme, setTheme } = useTheme();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Appearance</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					<div className="grid grid-cols-3 gap-4">
						<Card
							className={`cursor-pointer p-4 ${
								theme === "light" ? "border-primary" : ""
							}`}
							onClick={() => setTheme("light")}
						>
							<div className="space-y-2 text-center">
								<Sun className="w-6 h-6 mx-auto" />
								<h3 className="text-sm font-medium">Light</h3>
							</div>
						</Card>
						<Card
							className={`cursor-pointer p-4 ${
								theme === "dark" ? "border-primary" : ""
							}`}
							onClick={() => setTheme("dark")}
						>
							<div className="space-y-2 text-center">
								<Moon className="w-6 h-6 mx-auto" />
								<h3 className="text-sm font-medium">Dark</h3>
							</div>
						</Card>
						<Card
							className={`cursor-pointer p-4 ${
								theme === "system" ? "border-primary" : ""
							}`}
							onClick={() => setTheme("system")}
						>
							<div className="space-y-2 text-center">
								<Monitor className="w-6 h-6 mx-auto" />
								<h3 className="text-sm font-medium">System</h3>
							</div>
						</Card>
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between py-3">
						<div className="space-y-0.5">
							<h3 className="text-sm font-medium">Reduce animations</h3>
							<p className="text-sm text-muted-foreground">
								Disable animations for better performance
							</p>
						</div>
						<Switch />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
