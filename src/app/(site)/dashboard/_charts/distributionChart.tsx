"use client";

import React from "react";
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

interface DistributionChartProps {
	distribution?: {
		completed: number;
		failed: number;
		pending: number;
		running: number;
	};
}

export default function DistributionChart({
	distribution,
}: DistributionChartProps) {
	const hasData =
		distribution && Object.values(distribution).some((value) => value > 0);

	const data = [
		{
			jobType: "Completed",
			total: distribution?.completed ?? 0,
		},
		{
			jobType: "Running",
			total: distribution?.running ?? 0,
		},
		{
			jobType: "Failed",
			total: distribution?.failed ?? 0,
		},
		{
			jobType: "Pending",
			total: distribution?.pending ?? 0,
		},
	];

	return (
		<Card className="w-full h-full">
			<CardHeader>
				<CardTitle>Scraping Jobs Distribution</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="w-full h-[200px] sm:h-[300px]">
					{!hasData ? (
						<div className="h-full w-full flex flex-col items-center justify-center gap-4">
							<p className="text-muted-foreground text-center">
								Track your scraping jobs progress and performance
							</p>
							<Link href="/scraping">
								<Button size="sm" className="gap-2">
									<PlusIcon className="w-4 h-4" />
									Start Your First Job
								</Button>
							</Link>
						</div>
					) : (
						<ResponsiveContainer width="100%" height="100%">
							<RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
								<PolarGrid />
								<PolarAngleAxis dataKey="jobType" />
								<PolarRadiusAxis />
								<Radar
									name="Distribution"
									dataKey="total"
									stroke="#1C7C54"
									fill="#1C7C54"
									fillOpacity={0.6}
								/>
							</RadarChart>
						</ResponsiveContainer>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
