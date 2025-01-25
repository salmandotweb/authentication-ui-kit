"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./navbar";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Image from "next/image";

const Header = () => {
	return (
		<header className="relative min-h-screen flex flex-col">
			<Navbar />

			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

			<div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />

			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					initial={{ opacity: 0, scale: 0.5, x: -50 }}
					animate={{ opacity: 1, scale: 1, x: 0 }}
					transition={{ duration: 1 }}
					className="absolute -top-48 -left-48 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
				/>
				<motion.div
					initial={{ opacity: 0, scale: 0.5, x: 50 }}
					animate={{ opacity: 1, scale: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.2 }}
					className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
				/>
			</div>

			<div className="relative flex-grow flex items-center justify-center px-4">
				<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="text-left space-y-8"
					>
						<div className="space-y-4">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="inline-block"
							>
								<span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
									✨ Launching Soon
								</span>
							</motion.div>
							<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
								Modern <span className="text-primary">Authentication</span>{" "}
								<br /> UI Kit
							</h1>
							<p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
								Beautiful, responsive authentication flows built with{" "}
								<span className="text-primary font-medium">Next.js</span> and{" "}
								<span className="text-primary font-medium">Tailwind CSS</span>
							</p>
						</div>

						<div className="flex flex-col sm:flex-row items-start gap-4">
							<Link href="/sign-up">
								<Button size="lg" className="text-base font-medium h-12 px-6">
									Get Started
									<ArrowTopRightIcon className="ml-2" />
								</Button>
							</Link>
							<Link href="https://github.com/yourusername/auth-ui-kit">
								<Button
									size="lg"
									variant="outline"
									className="text-base font-medium h-12 px-6"
								>
									<svg
										viewBox="0 0 24 24"
										className="h-5 w-5 mr-2"
										fill="currentColor"
									>
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
									</svg>
									View on GitHub
								</Button>
							</Link>
						</div>

						<div className="flex items-center gap-6 text-muted-foreground">
							<div className="flex -space-x-2">
								{[...Array(4)].map((_, i) => (
									<div
										key={i}
										className="h-8 w-8 rounded-full border-2 border-background bg-primary/20"
									/>
								))}
							</div>
							<p className="text-sm">
								Join <span className="text-foreground font-medium">2,000+</span>{" "}
								developers building better auth
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="relative lg:block"
					>
						<div className="relative">
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									duration: 0.5,
									delay: 0.5,
									type: "spring",
									stiffness: 100,
								}}
								className="rounded-xl border bg-card/50 backdrop-blur shadow-2xl overflow-hidden"
							>
								<Image
									src="/images/dashboard.png"
									alt="Auth UI Kit Preview"
									width={800}
									height={600}
									className="w-full h-auto"
									priority
								/>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}
								className="absolute -top-6 -left-6 p-4 rounded-lg bg-card border shadow-lg"
							>
								<div className="flex items-center gap-3">
									<div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
										🚀
									</div>
									<div>
										<p className="text-sm font-medium">Quick Setup</p>
										<p className="text-xs text-muted-foreground">
											Ready in minutes
										</p>
									</div>
								</div>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.9 }}
								className="absolute -bottom-6 -right-6 p-4 rounded-lg bg-card border shadow-lg"
							>
								<div className="flex items-center gap-3">
									<div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
										⚡️
									</div>
									<div>
										<p className="text-sm font-medium">Modern Stack</p>
										<p className="text-xs text-muted-foreground">
											Next.js & Tailwind
										</p>
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			</div>
		</header>
	);
};

export default Header;
