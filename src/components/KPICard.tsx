import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KPI {
	label: string;
	value: number;
	change: number | null;
	icon: React.ElementType;
}

interface KPICardProps {
	kpi: KPI;
	loading?: boolean;
}

export function KPICard({ kpi, loading }: KPICardProps) {
	const IconComponent = kpi.icon;
	const isEmpty = kpi.value === 0;

	return (
		<Card className="overflow-hidden">
			<CardContent loading={loading} className="p-4 sm:p-6">
				<div className="flex items-center justify-between mb-2 sm:mb-4">
					<IconComponent
						className={cn(
							"w-5 h-5 sm:w-6 sm:h-6",
							isEmpty ? "text-muted-foreground" : "text-primary"
						)}
					/>
					{kpi.change !== null && (
						<span
							className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
								kpi.change && kpi.change > 0
									? "bg-green-100 text-green-800"
									: kpi.change && kpi.change < 0
									? "bg-red-100 text-red-800"
									: "bg-gray-100 text-gray-800"
							}`}
						>
							{kpi.change && kpi.change > 0 ? (
								<ArrowUpIcon className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
							) : kpi.change && kpi.change < 0 ? (
								<ArrowDownIcon className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
							) : null}
							{kpi.change && Math.abs(kpi.change)}%
						</span>
					)}
				</div>
				<div className="space-y-1">
					<h2
						className={cn(
							"text-xl sm:text-2xl font-bold tracking-tight",
							isEmpty && "text-muted-foreground"
						)}
					>
						{kpi.value.toLocaleString()}
					</h2>
					<p className="text-xs sm:text-sm text-muted-foreground">
						{kpi.label}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
