"use client";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Area,
	Legend,
} from "recharts";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipLoader } from "react-spinners";
import { useApiQuery } from "@/hooks/useApi";
import { Response } from "@/interfaces/response";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

interface JobAnalytics {
	date: string;
	totalJobs: number;
}

const ScrapingJobsChart = () => {
	const [timeRange, setTimeRange] = useState<string>("weekly");

	const { data: stats, isFetching: isLoading } = useApiQuery<
		Response<JobAnalytics[]>
	>(
		["jobs-analytics", timeRange],
		`/scraping-jobs/analytics?period=${timeRange}`
	);

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		switch (timeRange) {
			case "daily":
				return date.toLocaleDateString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					day: "numeric",
					month: "short",
				});
			case "weekly":
				return date.toLocaleDateString("en-US", {
					weekday: "short",
					month: "short",
					day: "numeric",
				});
			case "monthly":
				return date.toLocaleDateString("en-US", {
					day: "numeric",
					month: "short",
					year: "numeric",
				});
			default:
				return dateStr;
		}
	};

	const hasData = stats?.data?.some((item) => item.totalJobs > 0);

	return (
		<Card className="w-full h-full">
			<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
				<CardTitle>Scraping Jobs</CardTitle>
				{hasData && (
					<Select
						value={timeRange}
						onValueChange={(value) => setTimeRange(value)}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select time range" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="daily">Daily</SelectItem>
							<SelectItem value="weekly">Weekly</SelectItem>
							<SelectItem value="monthly">Monthly</SelectItem>
						</SelectContent>
					</Select>
				)}
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<div className="flex justify-center items-center h-[200px] sm:h-[300px]">
						<ClipLoader size={30} />
					</div>
				) : !hasData ? (
					<div className="flex flex-col items-center justify-center h-[200px] sm:h-[300px] gap-4">
						<p className="text-muted-foreground text-center">
							Start collecting leads by creating your first scraping job
						</p>
						<Link href="/scraping">
							<Button size="sm" className="gap-2">
								<PlusIcon className="w-4 h-4" />
								Start Collecting Leads
							</Button>
						</Link>
					</div>
				) : (
					<div className="w-full h-[200px] sm:h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={stats?.data}>
								<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
								<XAxis
									dataKey="date"
									tick={{ fontSize: 12 }}
									tickFormatter={formatDate}
									stroke="hsl(var(--foreground))"
								/>
								<YAxis
									yAxisId="left"
									tick={{ fontSize: 12 }}
									tickFormatter={(value) => `${value}`}
									stroke="hsl(var(--foreground))"
								/>
								<YAxis
									yAxisId="right"
									orientation="right"
									tick={{ fontSize: 12 }}
									stroke="#72BF78"
								/>
								<Tooltip
									contentStyle={{
										backgroundColor: "hsl(var(--background))",
										border: "1px solid hsl(var(--border))",
										borderRadius: "var(--radius)",
									}}
									labelStyle={{ color: "hsl(var(--foreground))" }}
									labelFormatter={formatDate}
								/>
								<Legend />
								<defs>
									<linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="5%"
											stopColor="hsl(var(--primary))"
											stopOpacity={0.8}
										/>
										<stop
											offset="95%"
											stopColor="hsl(var(--primary))"
											stopOpacity={0}
										/>
									</linearGradient>
								</defs>
								<Area
									yAxisId="left"
									type="monotone"
									dataKey="totalJobs"
									name="Total Jobs"
									stroke="hsl(var(--primary))"
									fillOpacity={1}
									fill="url(#colorSales)"
								/>
								<Line
									yAxisId="left"
									type="monotone"
									dataKey="totalJobs"
									name="Total Jobs"
									stroke="hsl(var(--primary))"
									strokeWidth={2}
									dot={false}
									activeDot={{ r: 8, fill: "hsl(var(--primary))" }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default ScrapingJobsChart;
