"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function SignIn() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// Add your sign-in logic here
		// For demo, we'll just simulate a delay
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setCookie("authToken", "demo-token");
		router.push("/dashboard");
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="space-y-6"
		>
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-bold">Welcome back</h1>
				<p className="text-muted-foreground">
					Enter your email to sign in to your account
				</p>
			</div>

			<div className="space-y-4">
				<Button
					variant="outline"
					className="w-full"
					onClick={() => {
						// Add Google sign-in logic
					}}
				>
					<FcGoogle className="mr-2 h-4 w-4" />
					Sign in with Google
				</Button>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							placeholder="m@example.com"
							required
							type="email"
							disabled={isLoading}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							required
							type="password"
							disabled={isLoading}
							placeholder="********"
						/>
					</div>

					<Button className="w-full" type="submit" disabled={isLoading}>
						{isLoading ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</div>

			<div className="text-center text-sm">
				<Link
					href="/forgot-password"
					className="text-primary hover:text-primary/90"
				>
					Forgot your password?
				</Link>
			</div>

			<div className="text-center text-sm">
				Don't have an account?{" "}
				<Link href="/sign-up" className="text-primary hover:text-primary/90">
					Sign up
				</Link>
			</div>
		</motion.div>
	);
}
