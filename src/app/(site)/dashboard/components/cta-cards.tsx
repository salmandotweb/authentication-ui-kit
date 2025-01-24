"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Target } from "lucide-react";
import { motion } from "framer-motion";

export function CTACards() {
	return (
		<>
			<Card className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/20 w-full">
				<CardContent className="p-6">
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2">
							<div className="p-2 w-fit rounded-full bg-primary/20">
								<Rocket className="w-5 h-5 text-primary" />
							</div>
							<span className="font-semibold">Upgrade to Pro</span>
						</div>
						<p className="text-sm text-muted-foreground">
							Get exclusive access to advanced analytics, custom branding, and
							priority support.
						</p>
						<Button
							variant="default"
							className="w-fit mt-2"
							onClick={() => (window.location.href = "/billing")}
						>
							Upgrade Now
							<ArrowRight className="w-4 h-4 ml-2" />
						</Button>
					</div>
					<motion.div
						className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/10 rounded-full"
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 4, repeat: Infinity }}
					/>
				</CardContent>
			</Card>

			<Card className="relative overflow-hidden bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-background border-blue-500/20 w-full">
				<CardContent className="p-6">
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-2">
							<div className="p-2 w-fit rounded-full bg-blue-500/20">
								<Target className="w-5 h-5 text-blue-500" />
							</div>
							<span className="font-semibold">Complete Setup</span>
						</div>
						<p className="text-sm text-muted-foreground">
							Finish setting up your profile and explore all available features.
						</p>
						<Button
							variant="outline"
							className="w-fit mt-2 border-blue-500/50 hover:bg-blue-500/10"
							onClick={() => (window.location.href = "/settings")}
						>
							Continue Setup
							<ArrowRight className="w-4 h-4 ml-2" />
						</Button>
					</div>
					<motion.div
						className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-500/10 rounded-full"
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 4, repeat: Infinity, delay: 1 }}
					/>
				</CardContent>
			</Card>
		</>
	);
}
