"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import MagicLinkForm from "@/components/auth/magic-link-form";

const signInSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignIn() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const [authMethod, setAuthMethod] = useState<"password" | "magic-link">(
		"password"
	);

	const form = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: SignInValues) => {
		setIsLoading(true);
		try {
			// Add your sign-in logic here
			// For demo, we'll just simulate a delay
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setCookie("authToken", "demo-token");
			router.push("/dashboard");
		} catch (error) {
			// Handle error
		} finally {
			setIsLoading(false);
		}
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
				<p className="text-muted-foreground">Sign in to your account</p>
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

				<div className="flex gap-2 w-full">
					<Button
						variant={authMethod === "password" ? "default" : "outline"}
						className="flex-1"
						onClick={() => setAuthMethod("password")}
					>
						Password
					</Button>
					<Button
						variant={authMethod === "magic-link" ? "default" : "outline"}
						className="flex-1"
						onClick={() => setAuthMethod("magic-link")}
					>
						Magic Link
					</Button>
				</div>

				{authMethod === "password" ? (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder="m@example.com"
												type="email"
												{...field}
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="********"
												{...field}
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button className="w-full" type="submit" disabled={isLoading}>
								{isLoading ? "Signing in..." : "Sign in"}
							</Button>
						</form>
					</Form>
				) : (
					<MagicLinkForm />
				)}
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
