"use client";

import * as React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
	TrendingUp,
	TrendingDown,
	Diamond,
	Zap,
	Building2,
	Wrench,
} from "lucide-react";

const products = [
	{
		name: "Premium Plan",
		sales: 892,
		growth: 12.5,
		progress: 78,
		revenue: 89200,
		icon: Diamond,
		color: "text-violet-500",
		bgColor: "bg-violet-500/20",
	},
	{
		name: "Basic Plan",
		sales: 645,
		growth: 8.2,
		progress: 63,
		revenue: 32250,
		icon: Zap,
		color: "text-blue-500",
		bgColor: "bg-blue-500/20",
	},
	{
		name: "Enterprise Plan",
		sales: 258,
		growth: 15.8,
		progress: 42,
		revenue: 154800,
		icon: Building2,
		color: "text-emerald-500",
		bgColor: "bg-emerald-500/20",
	},
	{
		name: "Custom Solution",
		sales: 124,
		growth: -2.4,
		progress: 28,
		revenue: 99200,
		icon: Wrench,
		color: "text-amber-500",
		bgColor: "bg-amber-500/20",
	},
];

export function TopProducts() {
	return (
		<Card className="w-full h-[420px]">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<CardTitle>Top Products</CardTitle>
						<CardDescription>Best performing products by sales</CardDescription>
					</div>
					<Badge variant="secondary" className="px-4">
						{products.length} Products
					</Badge>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{products.map((product) => {
						const Icon = product.icon;
						return (
							<div key={product.name} className="space-y-2">
								<div className="flex items-center gap-4">
									<div className={cn("p-2 rounded-xl", product.bgColor)}>
										<Icon className={cn("h-5 w-5", product.color)} />
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between gap-2">
											<div className="flex items-center gap-2">
												<p className="text-sm font-medium truncate">
													{product.name}
												</p>
												<div
													className={cn(
														"flex items-center gap-1 text-xs",
														product.growth > 0
															? "text-emerald-500"
															: "text-red-500"
													)}
												>
													{product.growth > 0 ? (
														<TrendingUp className="h-3 w-3" />
													) : (
														<TrendingDown className="h-3 w-3" />
													)}
													{Math.abs(product.growth)}%
												</div>
											</div>
											<p className="text-sm font-medium">
												${product.revenue.toLocaleString()}
											</p>
										</div>
										<div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
											<span>{product.sales.toLocaleString()} sales</span>
											<span>{product.progress}% of total</span>
										</div>
									</div>
								</div>
								<Progress
									value={product.progress}
									className="h-1.5"
									indicatorClassName={cn(
										product.growth > 0 ? "bg-emerald-500" : "bg-red-500"
									)}
								/>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
