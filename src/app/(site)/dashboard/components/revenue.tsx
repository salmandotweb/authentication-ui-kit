"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const chartData = [
	{ date: "2024-04-01", recurring: 2220, oneTime: 1500 },
	{ date: "2024-04-02", recurring: 970, oneTime: 1800 },
	{ date: "2024-04-03", recurring: 1670, oneTime: 1200 },
	{ date: "2024-04-04", recurring: 2420, oneTime: 2600 },
	{ date: "2024-04-05", recurring: 3730, oneTime: 2900 },
	{ date: "2024-04-06", recurring: 3010, oneTime: 3400 },
	{ date: "2024-04-07", recurring: 2450, oneTime: 1800 },
	{ date: "2024-04-08", recurring: 4090, oneTime: 3200 },
	{ date: "2024-04-09", recurring: 590, oneTime: 1100 },
	{ date: "2024-04-10", recurring: 2610, oneTime: 1900 },
	{ date: "2024-04-11", recurring: 3270, oneTime: 3500 },
	{ date: "2024-04-12", recurring: 2920, oneTime: 2100 },
	{ date: "2024-04-13", recurring: 3420, oneTime: 3800 },
	{ date: "2024-04-14", recurring: 1370, oneTime: 2200 },
	{ date: "2024-04-15", recurring: 1200, oneTime: 1700 },
	{ date: "2024-04-16", recurring: 1380, oneTime: 1900 },
	{ date: "2024-04-17", recurring: 4460, oneTime: 3600 },
	{ date: "2024-04-18", recurring: 3640, oneTime: 4100 },
	{ date: "2024-04-19", recurring: 2430, oneTime: 1800 },
	{ date: "2024-04-20", recurring: 890, oneTime: 1500 },
	{ date: "2024-04-21", recurring: 1370, oneTime: 2000 },
	{ date: "2024-04-22", recurring: 2240, oneTime: 1700 },
	{ date: "2024-04-23", recurring: 1380, oneTime: 2300 },
	{ date: "2024-04-24", recurring: 3870, oneTime: 2900 },
	{ date: "2024-04-25", recurring: 2150, oneTime: 2500 },
	{ date: "2024-04-26", recurring: 750, oneTime: 1300 },
	{ date: "2024-04-27", recurring: 3830, oneTime: 4200 },
	{ date: "2024-04-28", recurring: 1220, oneTime: 1800 },
	{ date: "2024-04-29", recurring: 3150, oneTime: 2400 },
	{ date: "2024-04-30", recurring: 4540, oneTime: 3800 },
	{ date: "2024-05-01", recurring: 1650, oneTime: 2200 },
	{ date: "2024-05-02", recurring: 2930, oneTime: 3100 },
	{ date: "2024-05-03", recurring: 2470, oneTime: 1900 },
	{ date: "2024-05-04", recurring: 3850, oneTime: 4200 },
	{ date: "2024-05-05", recurring: 4810, oneTime: 3900 },
	{ date: "2024-05-06", recurring: 4980, oneTime: 5200 },
	{ date: "2024-05-07", recurring: 3880, oneTime: 3000 },
	{ date: "2024-05-08", recurring: 1490, oneTime: 2100 },
	{ date: "2024-05-09", recurring: 2270, oneTime: 1800 },
	{ date: "2024-05-10", recurring: 2930, oneTime: 3300 },
	{ date: "2024-05-11", recurring: 3350, oneTime: 2700 },
	{ date: "2024-05-12", recurring: 1970, oneTime: 2400 },
	{ date: "2024-05-13", recurring: 1970, oneTime: 1600 },
	{ date: "2024-05-14", recurring: 4480, oneTime: 4900 },
	{ date: "2024-05-15", recurring: 4730, oneTime: 3800 },
	{ date: "2024-05-16", recurring: 3380, oneTime: 4000 },
	{ date: "2024-05-17", recurring: 4990, oneTime: 4200 },
	{ date: "2024-05-18", recurring: 3150, oneTime: 3500 },
	{ date: "2024-05-19", recurring: 2350, oneTime: 1800 },
	{ date: "2024-05-20", recurring: 1770, oneTime: 2300 },
	{ date: "2024-05-21", recurring: 820, oneTime: 1400 },
	{ date: "2024-05-22", recurring: 810, oneTime: 1200 },
	{ date: "2024-05-23", recurring: 2520, oneTime: 2900 },
	{ date: "2024-05-24", recurring: 2940, oneTime: 2200 },
	{ date: "2024-05-25", recurring: 2010, oneTime: 2500 },
	{ date: "2024-05-26", recurring: 2130, oneTime: 1700 },
	{ date: "2024-05-27", recurring: 4200, oneTime: 4600 },
	{ date: "2024-05-28", recurring: 2330, oneTime: 1900 },
	{ date: "2024-05-29", recurring: 780, oneTime: 1300 },
	{ date: "2024-05-30", recurring: 3400, oneTime: 2800 },
	{ date: "2024-05-31", recurring: 1780, oneTime: 2300 },
	{ date: "2024-06-01", recurring: 1780, oneTime: 2000 },
	{ date: "2024-06-02", recurring: 4700, oneTime: 4100 },
	{ date: "2024-06-03", recurring: 1030, oneTime: 1600 },
	{ date: "2024-06-04", recurring: 4390, oneTime: 3800 },
	{ date: "2024-06-05", recurring: 880, oneTime: 1400 },
	{ date: "2024-06-06", recurring: 2940, oneTime: 2500 },
	{ date: "2024-06-07", recurring: 3230, oneTime: 3700 },
	{ date: "2024-06-08", recurring: 3850, oneTime: 3200 },
	{ date: "2024-06-09", recurring: 4380, oneTime: 4800 },
	{ date: "2024-06-10", recurring: 1550, oneTime: 2000 },
	{ date: "2024-06-11", recurring: 920, oneTime: 1500 },
	{ date: "2024-06-12", recurring: 4920, oneTime: 4200 },
	{ date: "2024-06-13", recurring: 810, oneTime: 1300 },
	{ date: "2024-06-14", recurring: 4260, oneTime: 3800 },
	{ date: "2024-06-15", recurring: 3070, oneTime: 3500 },
	{ date: "2024-06-16", recurring: 3710, oneTime: 3100 },
	{ date: "2024-06-17", recurring: 4750, oneTime: 5200 },
	{ date: "2024-06-18", recurring: 1070, oneTime: 1700 },
	{ date: "2024-06-19", recurring: 3410, oneTime: 2900 },
	{ date: "2024-06-20", recurring: 4080, oneTime: 4500 },
	{ date: "2024-06-21", recurring: 1690, oneTime: 2100 },
	{ date: "2024-06-22", recurring: 3170, oneTime: 2700 },
	{ date: "2024-06-23", recurring: 4800, oneTime: 5300 },
	{ date: "2024-06-24", recurring: 1320, oneTime: 1800 },
	{ date: "2024-06-25", recurring: 1410, oneTime: 1900 },
	{ date: "2024-06-26", recurring: 4340, oneTime: 3800 },
	{ date: "2024-06-27", recurring: 4480, oneTime: 4900 },
	{ date: "2024-06-28", recurring: 1490, oneTime: 2000 },
	{ date: "2024-06-29", recurring: 1030, oneTime: 1600 },
	{ date: "2024-06-30", recurring: 4460, oneTime: 4000 },
].map((item) => ({
	...item,
	// Multiply values by 10 to represent dollars
	recurring: item.recurring * 10,
	oneTime: item.oneTime * 10,
}));

const chartConfig = {
	recurring: {
		label: "Recurring Revenue",
		color: "hsl(var(--primary))",
	},
	oneTime: {
		label: "One-time Revenue",
		color: "hsl(var(--muted-foreground))",
	},
} satisfies ChartConfig;

export function Revenue() {
	const [timeRange, setTimeRange] = React.useState("90d");

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date("2024-06-30");
		let daysToSubtract = 90;
		if (timeRange === "30d") {
			daysToSubtract = 30;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	const totalRevenue = React.useMemo(() => {
		return filteredData.reduce(
			(acc, item) => acc + item.recurring + item.oneTime,
			0
		);
	}, [filteredData]);

	const recurringRevenue = React.useMemo(() => {
		return filteredData.reduce((acc, item) => acc + item.recurring, 0);
	}, [filteredData]);

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 border-b pb-4 mb-4">
				<div className="space-y-1">
					<CardTitle className="text-xl font-semibold tracking-tight">
						Revenue Overview
					</CardTitle>
					<CardDescription className="text-sm text-muted-foreground">
						${(totalRevenue / 1000).toFixed(1)}k total revenue
						<span className="text-primary ml-1">
							(${(recurringRevenue / 1000).toFixed(1)}k recurring)
						</span>
					</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="h-9 w-[130px] rounded-full"
						aria-label="Select time range"
					>
						<SelectValue placeholder="Select range" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="7d">Last 7 days</SelectItem>
						<SelectItem value="30d">Last 30 days</SelectItem>
						<SelectItem value="90d">Last 3 months</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="pt-4 px-0 sm:px-6">
				<ChartContainer
					config={chartConfig}
					className="h-[300px] sm:h-[350px] w-full"
				>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id="fillRecurring" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="0%"
									stopColor="hsl(var(--primary))"
									stopOpacity={0.25}
								/>
								<stop
									offset="100%"
									stopColor="hsl(var(--primary))"
									stopOpacity={0.05}
								/>
							</linearGradient>
							<linearGradient id="fillOneTime" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="0%"
									stopColor="hsl(var(--muted-foreground))"
									stopOpacity={0.25}
								/>
								<stop
									offset="100%"
									stopColor="hsl(var(--muted-foreground))"
									stopOpacity={0.05}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid
							vertical={false}
							stroke="hsl(var(--border))"
							opacity={0.3}
							strokeDasharray="4 4"
						/>
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={12}
							minTickGap={50}
							tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							cursor={{
								stroke: "hsl(var(--primary))",
								strokeWidth: 1,
								strokeDasharray: "4 4",
							}}
							formatter={(value: number) => {
								return [
									new Intl.NumberFormat("en-US", {
										style: "currency",
										currency: "USD",
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
									}).format(value),
								];
							}}
							content={
								<ChartTooltipContent
									labelFormatter={(value: string) => {
										return new Date(value).toLocaleDateString("en-US", {
											weekday: "short",
											month: "short",
											day: "numeric",
										});
									}}
									indicator="dot"
									className="rounded-2xl border-2 border-border/50"
								/>
							}
						/>
						<Area
							dataKey="recurring"
							type="monotone"
							fill="url(#fillRecurring)"
							stroke="hsl(var(--primary))"
							strokeWidth={2.5}
							stackId="a"
						/>
						<Area
							dataKey="oneTime"
							type="monotone"
							fill="url(#fillOneTime)"
							stroke="hsl(var(--muted-foreground))"
							strokeWidth={2.5}
							stackId="a"
						/>
						<ChartLegend
							content={
								<ChartLegendContent className="pt-6 border-t border-border/50" />
							}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
