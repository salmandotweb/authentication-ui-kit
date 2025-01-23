"use client";

import React from "react";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Legend,
	Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApiQuery } from "@/hooks/useApi";
import { Response } from "@/interfaces/response";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

const COLORS = ["#1C7C54", "#B1CF5F"];

interface Distribution {
	verified: number;
	notVerified: number;
}

const ContactsDistributionChart: React.FC = () => {
	const { data: distribution } = useApiQuery<Response<Distribution>>(
		["contacts-distribution"],
		"/contacts/distribution"
	);

	const data = [
		{ name: "Verified", value: distribution?.data.verified ?? 0 },
		{ name: "Not Verified", value: distribution?.data.notVerified ?? 0 },
	];

	const hasData = data.some((item) => item.value > 0);

	return (
		<Card className="w-full h-full">
			<CardHeader>
				<CardTitle>Contacts Distribution</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="w-full h-[300px]">
					{!hasData ? (
						<div className="h-full w-full flex flex-col items-center justify-center gap-4">
							<p className="text-muted-foreground text-center">
								Import or create your first contact list to get started
							</p>
							<Link href="/contacts">
								<Button size="sm" className="gap-2">
									<PlusIcon className="w-4 h-4" />
									Import Contact List
								</Button>
							</Link>
						</div>
					) : (
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									data={data}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) =>
										`${name} ${(percent * 100).toFixed(0)}%`
									}
								>
									{data.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default ContactsDistributionChart;
