"use client";

import * as React from "react";
import {
	AreaChart,
	Area,
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
import { Badge } from "@/components/ui/badge";

const data = [
	{ day: "Mon", rate: 2.5, previousRate: 2.0 },
	{ day: "Tue", rate: 3.1, previousRate: 2.8 },
	{ day: "Wed", rate: 2.8, previousRate: 2.6 },
	{ day: "Thu", rate: 3.5, previousRate: 3.2 },
	{ day: "Fri", rate: 3.2, previousRate: 3.0 },
	{ day: "Sat", rate: 2.9, previousRate: 2.7 },
	{ day: "Sun", rate: 3.8, previousRate: 3.4 },
];

const averageRate =
	data.reduce((acc, item) => acc + item.rate, 0) / data.length;
const previousAverageRate =
	data.reduce((acc, item) => acc + item.previousRate, 0) / data.length;
const rateChange =
	((averageRate - previousAverageRate) / previousAverageRate) * 100;

export function ConversionRate() {
	return (
		<Card className="w-full h-[420px]">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<CardTitle>Conversion Rate</CardTitle>
						<CardDescription>Weekly conversion performance</CardDescription>
					</div>
					<Badge variant={rateChange >= 0 ? "default" : "destructive"}>
						{rateChange >= 0 ? "+" : ""}
						{rateChange.toFixed(1)}%
					</Badge>
				</div>
				<div className="mt-4 flex items-center gap-4">
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-primary/20" />
						<span className="text-sm text-muted-foreground">Previous Week</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-primary" />
						<span className="text-sm text-muted-foreground">Current Week</span>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="h-[280px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={data}>
							<defs>
								<linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="hsl(var(--primary))"
										stopOpacity={0.3}
									/>
									<stop
										offset="95%"
										stopColor="hsl(var(--primary))"
										stopOpacity={0}
									/>
								</linearGradient>
								<linearGradient
									id="colorPreviousRate"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="hsl(var(--primary))"
										stopOpacity={0.15}
									/>
									<stop
										offset="95%"
										stopColor="hsl(var(--primary))"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="hsl(var(--border))"
								opacity={0.3}
							/>
							<XAxis
								dataKey="day"
								tick={{ fill: "hsl(var(--muted-foreground))" }}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								tick={{ fill: "hsl(var(--muted-foreground))" }}
								axisLine={false}
								tickLine={false}
								tickFormatter={(value) => `${value}%`}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "hsl(var(--background))",
									border: "1px solid hsl(var(--border))",
									borderRadius: "8px",
								}}
								formatter={(value: number) => [`${value}%`]}
							/>
							<Area
								type="monotone"
								dataKey="previousRate"
								stroke="hsl(var(--primary))"
								strokeWidth={2}
								fillOpacity={1}
								fill="url(#colorPreviousRate)"
								strokeOpacity={0.3}
							/>
							<Area
								type="monotone"
								dataKey="rate"
								stroke="hsl(var(--primary))"
								strokeWidth={2}
								fillOpacity={1}
								fill="url(#colorRate)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
