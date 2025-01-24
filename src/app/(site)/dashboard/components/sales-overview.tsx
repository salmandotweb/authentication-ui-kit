"use client";

import * as React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const data = [
	{ month: "Jan", sales: 4000 },
	{ month: "Feb", sales: 3000 },
	{ month: "Mar", sales: 2000 },
	{ month: "Apr", sales: 2780 },
	{ month: "May", sales: 1890 },
	{ month: "Jun", sales: 2390 },
];

export function SalesOverview() {
	return (
		<Card className="w-full h-[420px]">
			<CardHeader>
				<CardTitle>Sales Overview</CardTitle>
				<CardDescription>Monthly sales performance</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[320px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={data}>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="hsl(var(--border))"
								opacity={0.3}
							/>
							<XAxis
								dataKey="month"
								tick={{ fill: "hsl(var(--muted-foreground))" }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								tick={{ fill: "hsl(var(--muted-foreground))" }}
								axisLine={false}
								tickLine={false}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "hsl(var(--background))",
									border: "1px solid hsl(var(--border))",
									borderRadius: "8px",
								}}
								cursor={{ fill: "hsl(var(--accent))" }}
							/>
							<Bar
								dataKey="sales"
								fill="hsl(var(--primary))"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
