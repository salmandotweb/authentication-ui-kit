import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Star } from "lucide-react";

interface BillingSettingsProps {
	onSave: () => Promise<void>;
	isLoading: boolean;
}

export function BillingSettings({ onSave, isLoading }: BillingSettingsProps) {
	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Current Plan</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<div className="flex items-center gap-2">
								<h3 className="text-xl font-medium">Pro Plan</h3>
								<Badge variant="outline" className="bg-primary/20">
									Current
								</Badge>
							</div>
							<p className="text-sm text-muted-foreground">
								$29/month • Renews on Aug 1, 2024
							</p>
						</div>
						<Button variant="outline">Change Plan</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Payment Method</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center gap-4">
						<div className="p-2 bg-primary/10 rounded-lg">
							<CreditCard className="w-6 h-6" />
						</div>
						<div className="flex-1">
							<h3 className="text-sm font-medium">•••• 4242</h3>
							<p className="text-sm text-muted-foreground">Expires 12/24</p>
						</div>
						<Button variant="outline" size="sm">
							Update
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Billing History</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[
							{
								date: "Jul 1, 2023",
								amount: "$29.00",
								status: "Paid",
							},
							{
								date: "Jun 1, 2023",
								amount: "$29.00",
								status: "Paid",
							},
						].map((invoice, index) => (
							<div
								key={index}
								className="flex items-center justify-between py-3 border-b last:border-0"
							>
								<div className="space-y-1">
									<p className="text-sm font-medium">{invoice.date}</p>
									<p className="text-sm text-muted-foreground">
										{invoice.amount}
									</p>
								</div>
								<Button variant="ghost" size="sm">
									<Download className="w-4 h-4 mr-2" />
									Download
								</Button>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
