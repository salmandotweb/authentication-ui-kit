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

const products = [
	{
		name: "Premium Plan",
		sales: 892,
		growth: 12.5,
		progress: 78,
	},
	{
		name: "Basic Plan",
		sales: 645,
		growth: 8.2,
		progress: 63,
	},
	{
		name: "Enterprise Plan",
		sales: 258,
		growth: 15.8,
		progress: 42,
	},
	{
		name: "Custom Solution",
		sales: 124,
		growth: -2.4,
		progress: 28,
	},
];

export function TopProducts() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Top Products</CardTitle>
				<CardDescription>Best performing products by sales</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6">
					{products.map((product) => (
						<div key={product.name} className="flex flex-col gap-2">
							<div className="flex items-center justify-between">
								<div className="flex flex-col">
									<span className="font-medium">{product.name}</span>
									<span className="text-sm text-muted-foreground">
										{product.sales.toLocaleString()} sales
									</span>
								</div>
								<Badge variant={product.growth > 0 ? "default" : "destructive"}>
									{product.growth > 0 ? "+" : ""}
									{product.growth}%
								</Badge>
							</div>
							<Progress value={product.progress} className="h-2" />
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
