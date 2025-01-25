"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className="min-h-screen w-full grid lg:grid-cols-2 overflow-hidden bg-background">
				{/* Visual Side */}
				<div className="hidden lg:flex relative bg-primary/30">
					<div className="absolute inset-0 bg-grid-black/[0.2] bg-[size:20px_20px]" />
					<div className="absolute h-full w-full">
						{/* Animated shapes */}
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							className="absolute top-1/4 left-1/4 h-40 w-40 rounded-full bg-primary/40"
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="absolute top-1/2 right-1/4 h-60 w-60 rounded-full bg-primary/40"
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="absolute bottom-1/4 left-1/3 h-48 w-48 rounded-full bg-primary/40"
						/>
					</div>
					{/* Gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
				</div>

				{/* Content Side */}
				<main className="flex items-center justify-center p-6 lg:p-8">
					<div className="w-full max-w-md space-y-8">{children}</div>
				</main>
			</div>
		</Suspense>
	);
}
