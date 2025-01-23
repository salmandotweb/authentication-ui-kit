"use client";

import { FaCrown } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CheckIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const premiumPricing = {
	name: "Growth",
	price: {
		monthly: 99,
	},
	features: [
		"Collect 3000 Emails",
		"4000 Email Verifications",
		"15000 Email Sent Monthly",
		"6000 Contact List",
		"3 Domain Attach",
		"No charge for duplicates",
		"Export Contacts to CSV",
		"Premium Support",
		"API Access",
	],
};

const Upgrade = () => {
	const router = useRouter();

	const [open, setIsOpen] = useState(false);

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				setIsOpen(!open);
			}}
		>
			<DialogTrigger asChild>
				<Button
					className="flex items-center justify-center gap-2"
					size="sm"
					variant="outline"
				>
					Upgrade
					<FaCrown className="text-primary" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="flex items-center justify-center gap-2 text-2xl">
						<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
							Upgrade to {premiumPricing.name}
						</span>
						<FaCrown className="text-primary h-6 w-6" />
					</DialogTitle>
					<DialogDescription className="text-center pt-2">
						<Badge variant="secondary" className="mb-4">
							Most Popular
						</Badge>
						<div className="flex items-baseline justify-center gap-2 mb-6">
							<span className="text-3xl font-bold text-primary">
								${premiumPricing.price.monthly}
							</span>
							<span className="text-muted-foreground">/month</span>
						</div>
						<Progress value={33} className="h-2 mb-6" />
						<div className="space-y-4">
							{premiumPricing.features.map((feature, index) => (
								<div key={index} className="flex items-center gap-2">
									<div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
										<CheckIcon className="h-3 w-3 text-primary" />
									</div>
									<p className="text-sm text-muted-foreground">{feature}</p>
								</div>
							))}
						</div>
					</DialogDescription>
				</DialogHeader>
				<div className="mt-6 space-y-3">
					<Button
						className="w-full"
						onClick={() => {
							router.push("/billing");
							setIsOpen(false);
						}}
					>
						Upgrade Now
					</Button>
					<Button
						variant="outline"
						className="w-full"
						onClick={() => {
							router.push("/billing");
							setIsOpen(false);
						}}
					>
						See All Plans
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Upgrade;
