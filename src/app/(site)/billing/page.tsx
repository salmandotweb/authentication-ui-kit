"use client";

import React, { useState } from "react";
import PageHeader from "@/components/pageheader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "@radix-ui/react-icons";
import { DataTable } from "@/components/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useApiQuery } from "@/hooks/useApi";
import { Response } from "@/interfaces/response";
import {
	BillingInterval,
	formatPrice,
	getBillingIntervalLabel,
	ITransaction,
	SubscriptionWithPlan,
	TransactionResponse,
	TransactionStatus,
	UsageMetrics,
} from "@/interfaces/billing";
import { formatDate, getFeaturesList } from "@/lib/utils";
import {
	IPricingPlan,
	PricingPlanSkeleton,
} from "@/app/(landing)/_sections/pricing";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

const columns: ColumnDef<ITransaction>[] = [
	{
		accessorKey: "createdAt",
		header: "Date",
		cell: ({ row }) => <span>{formatDate(row.original.createdAt)}</span>,
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => (
			<span>{formatPrice(Number(row.original.amount ?? 0))}</span>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<Badge
				className="capitalize"
				variant={
					row.original.status === TransactionStatus.COMPLETED
						? "default"
						: row.original.status === TransactionStatus.FAILED
						? "destructive"
						: "secondary"
				}
			>
				{row.original.status}
			</Badge>
		),
	},
];

const BillingPage: React.FC = () => {
	const router = useRouter();
	const [isYearly, setIsYearly] = useState(false);

	const { data: activeSubscription } = useApiQuery<
		Response<SubscriptionWithPlan>
	>(["subscription"], "/billing/subscription");

	const { data: plans, isFetching: isLoadingPlans } = useApiQuery<
		Response<IPricingPlan[]>
	>(["plans"], "/billing/plans");

	const {
		data: transactions,
		isFetching: isLoadingTransactions,
		refetch: refetchTransactions,
	} = useApiQuery<Response<TransactionResponse>>(
		["transactions"],
		`/billing/transactions?page=1&limit=10`
	);

	const { data: usage } = useApiQuery<Response<UsageMetrics>>(
		["usage"],
		`/billing/usage`
	);

	const currentPlan = {
		name: activeSubscription?.data.plan.name,
		price: formatPrice(activeSubscription?.data.subscription.amount ?? 0),
		period: getBillingIntervalLabel(
			activeSubscription?.data.subscription.billingInterval ??
				BillingInterval.MONTHLY
		),
		features: activeSubscription?.data.plan.features
			? getFeaturesList(activeSubscription?.data.plan.features)
			: [],
	};

	const handleUpgrade = (priceId: string) => {
		const authToken = getCookie("authToken");
		if (!authToken) {
			router.push(`/sign-in?redirect=checkout&priceId=${priceId}`);
			return;
		}
		router.push(`/checkout?priceId=${priceId}`);
	};

	if (isLoadingPlans || !activeSubscription || !usage) {
		return (
			<div className="w-full h-full flex flex-col items-start gap-6 rounded-lg">
				<PageHeader title="Billing" />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
					{/* Current Plan Skeleton */}
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle>Current Plan</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col md:flex-row items-start gap-6">
								<div className="flex-1 space-y-4">
									<div className="space-y-2">
										<Skeleton className="h-8 w-32" />
										<Skeleton className="h-6 w-24" />
									</div>
									<div className="flex items-center gap-2">
										<Skeleton className="h-5 w-24" />
										<Skeleton className="h-5 w-32" />
									</div>
								</div>
								<div className="flex-1 space-y-3">
									<Skeleton className="h-5 w-24" />
									<div className="grid grid-cols-2 gap-2">
										{[...Array(6)].map((_, i) => (
											<div key={i} className="flex items-center gap-2">
												<Skeleton className="h-6 w-6 rounded-full" />
												<Skeleton className="h-4 w-24" />
											</div>
										))}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Usage Skeleton */}
					<Card>
						<CardHeader>
							<CardTitle>Usage</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="space-y-2">
									<div className="flex justify-between text-sm">
										<Skeleton className="h-4 w-32" />
										<Skeleton className="h-4 w-24" />
									</div>
									<Skeleton className="h-2 w-full" />
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				{/* Billing Period Toggle Skeleton */}
				<div className="flex items-center gap-4 w-full">
					<div className="flex items-center gap-2">
						<Skeleton className="h-5 w-10" />
						<Skeleton className="h-4 w-24" />
					</div>
					<Skeleton className="h-5 w-48" />
				</div>

				{/* Plans Grid Skeleton */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
					{[...Array(4)].map((_, index) => (
						<PricingPlanSkeleton key={index} />
					))}
				</div>

				{/* Billing History Table Skeleton */}
				<Card>
					<CardHeader>
						<CardTitle>Billing History</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="flex justify-between items-center">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-4 w-20" />
									<Skeleton className="h-4 w-16" />
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="w-full h-full flex flex-col items-start gap-6 rounded-lg">
			<PageHeader title="Billing" />

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>Current Plan</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col md:flex-row items-start gap-6">
							<div className="flex-1 space-y-4">
								<div className="space-y-2">
									<h3 className="text-3xl font-bold">{currentPlan.name}</h3>
									<div className="flex items-baseline gap-1">
										<span className="text-2xl font-bold">
											{currentPlan.price}
										</span>
										<span className="text-muted-foreground">
											{currentPlan.period}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-2">
									<Badge variant="secondary">Current Plan</Badge>
									<Badge variant="outline">
										Auto-renews {currentPlan.period}
									</Badge>
								</div>
							</div>
							<div className="flex-1 space-y-3">
								<h4 className="font-medium text-muted-foreground">
									Plan Features
								</h4>
								<div className="grid grid-cols-2 gap-2">
									{currentPlan.features.map((feature, index) => (
										<div key={index} className="flex items-center gap-2">
											<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
												<CheckIcon className="h-4 w-4 text-primary" />
											</div>
											<span className="text-sm">{feature}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Usage</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Email Collection</span>
								<span className="font-medium">
									{usage?.data?.emailsCollected?.toLocaleString() ?? 0} /{" "}
									{activeSubscription?.data.plan.features.maxEmails.toLocaleString() ??
										0}
								</span>
							</div>
							<Progress
								value={
									usage?.data?.emailsCollected &&
									activeSubscription?.data.plan.features.maxEmails
										? (usage.data.emailsCollected /
												activeSubscription.data.plan.features.maxEmails) *
										  100
										: 0
								}
								className="h-2"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">
									Email Verification
								</span>
								<span className="font-medium">
									{usage?.data?.emailsVerified?.toLocaleString() ?? 0} /{" "}
									{activeSubscription?.data.plan.features.maxVerifications.toLocaleString() ??
										0}
								</span>
							</div>
							<Progress
								value={
									usage?.data?.emailsVerified &&
									activeSubscription?.data.plan.features.maxVerifications
										? (usage.data.emailsVerified /
												activeSubscription.data.plan.features
													.maxVerifications) *
										  100
										: 0
								}
								className="h-2"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Emails Sent</span>
								<span className="font-medium">
									{usage?.data?.emailsSent?.toLocaleString() ?? 0} /{" "}
									{activeSubscription?.data.plan.features.maxEmailsSent.toLocaleString() ??
										0}
								</span>
							</div>
							<Progress
								value={
									usage?.data?.emailsSent &&
									activeSubscription?.data.plan.features.maxEmailsSent
										? (usage.data.emailsSent /
												activeSubscription.data.plan.features.maxEmailsSent) *
										  100
										: 0
								}
								className="h-2"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Contact Lists</span>
								<span className="font-medium">
									{usage?.data?.contactListsCreated?.toLocaleString() ?? 0} /{" "}
									{activeSubscription?.data.plan.features.maxContactLists.toLocaleString() ??
										0}
								</span>
							</div>
							<Progress
								value={
									usage?.data?.contactListsCreated &&
									activeSubscription?.data.plan.features.maxContactLists
										? (usage.data.contactListsCreated /
												activeSubscription.data.plan.features.maxContactLists) *
										  100
										: 0
								}
								className="h-2"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Connected Domains</span>
								<span className="font-medium">
									{usage?.data?.domainsAttached?.toLocaleString() ?? 0} /{" "}
									{activeSubscription?.data.plan.features.maxDomains.toLocaleString() ??
										0}
								</span>
							</div>
							<Progress
								value={
									usage?.data?.domainsAttached &&
									activeSubscription?.data.plan.features.maxDomains
										? (usage.data.domainsAttached /
												activeSubscription.data.plan.features.maxDomains) *
										  100
										: 0
								}
								className="h-2"
							/>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex items-center gap-4 w-full">
				<div className="flex items-center gap-2">
					<Switch
						checked={isYearly}
						onCheckedChange={setIsYearly}
						id="billing-period"
					/>
					<Label htmlFor="billing-period">Annual billing</Label>
				</div>
				<Badge variant="secondary">Save 10% with annual billing</Badge>
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
						<Card
							key={plan.name}
							className={`flex flex-col ${
								plan.name === currentPlan.name ? "border-primary" : ""
							}`}
						>
							<CardHeader>
								<CardTitle className="flex items-center justify-between">
									{plan.name}
									{plan.popular && (
										<Badge variant="secondary">Most Popular</Badge>
									)}
								</CardTitle>
								<div className="mt-4">
									<div className="flex items-baseline gap-1">
										<span className="text-3xl font-bold">
											{formatPrice(
												isYearly ? plan.yearlyPrice : plan.monthlyPrice
											)}
										</span>
										<span className="text-muted-foreground">
											{isYearly ? "/year" : "/month"}
										</span>
									</div>
									{isYearly && (
										<p className="text-sm text-muted-foreground mt-1">
											{formatPrice(
												(plan.monthlyPrice * 12 - plan.yearlyPrice) / 12
											)}{" "}
											savings/month
										</p>
									)}
								</div>
							</CardHeader>
							<CardContent className="flex-grow flex flex-col">
								<div className="space-y-4 flex-grow">
									<div className="space-y-2">
										{getFeaturesList(plan.features).map((feature, index) => (
											<div key={index} className="flex items-center gap-2">
												<div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
													<CheckIcon className="h-3 w-3 text-primary" />
												</div>
												<span className="text-sm">{feature}</span>
											</div>
										))}
									</div>
								</div>
								<Button
									className="w-full mt-6"
									variant={
										plan.name === currentPlan.name ? "outline" : "default"
									}
									disabled={plan.name === currentPlan.name}
									onClick={() =>
										handleUpgrade(
											isYearly ? plan.yearlyPriceId : plan.monthlyPriceId
										)
									}
								>
									{plan.name === currentPlan.name ? (
										"Current Plan"
									) : (
										<>
											{currentPlan.name ? "Upgrade to " : "Get "}
											{plan.name}
										</>
									)}
								</Button>
							</CardContent>
						</Card>
					))
				)}
			</div>

			<DataTable
				title="Billing History"
				columns={columns}
				data={transactions?.data.transactions ?? []}
				filterComponent={null}
				loading={isLoadingTransactions}
				refresh={refetchTransactions}
			/>
		</div>
	);
};

export default BillingPage;
