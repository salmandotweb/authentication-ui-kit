"use client";

import * as React from "react";
import {
	LineChart,
	Line,
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
	{ day: "Mon", rate: 2.5 },
	{ day: "Tue", rate: 3.1 },
	{ day: "Wed", rate: 2.8 },
	{ day: "Thu", rate: 3.5 },
	{ day: "Fri", rate: 3.2 },
	{ day: "Sat", rate: 2.9 },
	{ day: "Sun", rate: 3.8 },
];

export function ConversionRate() {
	return (
		<Card className="w-full h-[420px]">
			<CardHeader>
				<CardTitle>Conversion Rate</CardTitle>
				<CardDescription>Weekly conversion performance</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[320px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={data}>
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
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "hsl(var(--background))",
									border: "1px solid hsl(var(--border))",
									borderRadius: "8px",
								}}
							/>
							<Line
								type="monotone"
								dataKey="rate"
								stroke="hsl(var(--primary))"
								strokeWidth={2}
								dot={{ fill: "hsl(var(--primary))" }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
