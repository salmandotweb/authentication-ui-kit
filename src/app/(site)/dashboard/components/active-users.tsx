"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const data = [
	{ name: "Mobile", value: 45 },
	{ name: "Desktop", value: 35 },
	{ name: "Tablet", value: 20 },
];

const COLORS = [
	"hsl(var(--primary))",
	"hsl(var(--chart-2))",
	"hsl(var(--chart-3))",
];

export function ActiveUsers() {
	return (
		<Card className="w-full h-full">
			<CardHeader>
				<CardTitle>Active Users</CardTitle>
				<CardDescription>Active users by device type</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[250px] w-full flex items-center justify-center">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								innerRadius={60}
								outerRadius={80}
								paddingAngle={5}
								dataKey="value"
							>
								{data.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="flex items-center justify-center gap-4 mt-4">
					{data.map((entry, index) => (
						<div key={entry.name} className="flex items-center gap-2">
							<div
								className="w-3 h-3 rounded-full"
								style={{ backgroundColor: COLORS[index] }}
							/>
							<span className="text-sm text-muted-foreground">
								{entry.name} ({entry.value}%)
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
