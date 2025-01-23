import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import PricingPlan from "@/components/pricingPlan";
import { useApiQuery } from "@/hooks/useApi";
import { Response } from "@/interfaces/response";
import { getFeaturesList } from "@/lib/utils";

export type PlanPeriod = "monthly" | "yearly";

export enum PlanType {
	FREE = "free",
	BASIC = "basic",
	GROWTH = "growth",
	BUSINESS = "business",
}

export interface PlanFeatures {
	maxEmails: number;
	maxVerifications: number;
	maxEmailsSent: number;
	maxContactLists: number;
	maxDomains: number;
	hasApiAccess: boolean;
	hasPremiumSupport: boolean;
}

export interface IPricingPlan {
	name: string;
	type: PlanType;
	description: string;
	monthlyPrice: number;
	yearlyPrice: number;
	monthlyPriceId: string;
	yearlyPriceId: string;
	features: PlanFeatures;
	popular?: boolean;
}

const Pricing: React.FC = () => {
	const [activeTab, setActiveTab] = useState<PlanPeriod>("monthly");

	const { data: plans, isFetching: isLoadingPlans } = useApiQuery<
		Response<IPricingPlan[]>
	>(["plans"], "/billing/plans");

	return (
		<div
			className="w-full flex flex-col gap-8 md:gap-14 items-center justify-center p-4 sm:p-8"
			id="pricing"
		>
			<div className="flex flex-col items-start md:items-center justify-start md:justify-center md:gap-5 gap-3 max-w-2xl md:text-center text-left text-primary">
				<h2 className="md:text-5xl text-2xl font-bold">
					Pricing that scales with you
				</h2>
				<p className="md:text-lg text-base text-gray-600 font-medium">
					Our plans are designed to meet the requirements of both beginners and
					professionals. Get the right plan that suits you.
				</p>

				<div className="flex items-center justify-center gap-4 mt-4 md:mt-6">
					<Switch
						checked={activeTab === "yearly"}
						onCheckedChange={(e) => {
							setActiveTab(e ? "yearly" : "monthly");
						}}
					/>
					<p className="text-base font-medium">Annually</p>

					<div className="bg-[#DEF4C6] px-2 py-1 rounded-md">
						<p className="text-base font-medium">Save 10% on annual billing</p>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
				{isLoadingPlans ? (
					<>
						{[...Array(4)].map((_, index) => (
							<PricingPlanSkeleton key={index} />
						))}
					</>
				) : (
					plans?.data?.map((plan) => (
						<PricingPlan
							key={plan.name}
							name={plan.name}
							description={plan.description}
							price={
								activeTab === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
							}
							features={getFeaturesList(plan.features)}
							period={activeTab}
							popular={plan.popular}
							priceId={
								activeTab === "monthly"
									? plan.monthlyPriceId
									: plan.yearlyPriceId
							}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default Pricing;

export const PricingPlanSkeleton = () => {
	return (
		<div className="w-full flex flex-col items-start gap-6">
			<div className="flex flex-col items-start gap-4 p-5 border rounded-lg w-full min-h-[350px] bg-card animate-pulse">
				<div className="w-10 h-10 rounded-md bg-muted"></div>
				<div className="h-6 w-24 bg-muted rounded"></div>
				<div className="flex items-center gap-2">
					<div className="h-12 w-32 bg-muted rounded"></div>
					<div className="h-6 w-20 bg-muted rounded"></div>
				</div>
				<div className="h-16 w-full bg-muted rounded"></div>
				<div className="w-full h-10 bg-muted rounded-full mt-auto"></div>
			</div>
			<div className="flex flex-col gap-3 w-full">
				<div className="h-6 w-32 bg-muted rounded"></div>
				<div className="flex flex-col gap-2 w-full">
					{[...Array(6)].map((_, index) => (
						<div key={index} className="flex items-center gap-2">
							<div className="w-4 h-4 rounded-full bg-muted"></div>
							<div className="h-4 w-full max-w-[200px] bg-muted rounded"></div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
