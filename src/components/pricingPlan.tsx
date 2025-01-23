"use client";

import React from "react";
import {
	ArrowRightIcon,
	CheckCircledIcon,
	LightningBoltIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { PlanPeriod } from "@/app/(landing)/_sections/pricing";
import { getCookie } from "cookies-next";

interface PricingPlanProps {
	name: string;
	description: string;
	price: number;
	features: string[];
	popular?: boolean;
	period: PlanPeriod;
	priceId: string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
	name,
	description,
	price,
	features,
	popular,
	period,
	priceId,
}) => {
	const router = useRouter();

	const handleCheckout = () => {
		const authToken = getCookie("authToken");

		if (price === 0) {
			router.push("/dashboard");
			return;
		}

		if (!authToken) {
			// Store the intended plan in URL params for after login
			router.push(`/sign-in?redirect=checkout&priceId=${priceId}`);
			return;
		}

		router.push(`/checkout?priceId=${priceId}`);
	};

	return (
		<div className="w-full flex flex-col items-start gap-6">
			<div
				className={`flex flex-col items-start gap-4 p-5 border rounded-lg w-full min-h-[350px] ${
					popular ? "bg-primary text-white" : "bg-[#DEF4C6]"
				}`}
			>
				<div className="w-10 h-10 rounded-md bg-[#C3FF93] flex items-center justify-center">
					<LightningBoltIcon className="text-black w-4 h-4" />
				</div>
				<p className="text-lg font-medium">{name}</p>
				<div className="flex items-center gap-2">
					<h1 className="text-5xl font-semibold">${price}</h1>
					<p className="text-lg font-medium">
						{period === "monthly" ? "per month" : "per year"}
					</p>
				</div>
				<p className="text-base">{description}</p>

				<button
					className={`px-4 py-2 rounded-full border w-full font-semibold mt-auto flex items-center justify-center gap-2 transition-all duration-300 ${
						popular
							? "bg-[#C3FF93] text-black hover:bg-white hover:text-primary"
							: "hover:bg-primary hover:text-white"
					}`}
					onClick={handleCheckout}
				>
					Get Started <ArrowRightIcon />
				</button>
			</div>
			<div className="flex flex-col gap-3 w-full">
				<p className="text-lg font-semibold">{`What's`} included</p>

				<div className="flex flex-col gap-2 w-full">
					{features.map((feature, index) => (
						<p
							key={index}
							className="text-base font-medium flex items-center justify-start gap-2"
						>
							<CheckCircledIcon />
							{feature}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default PricingPlan;
