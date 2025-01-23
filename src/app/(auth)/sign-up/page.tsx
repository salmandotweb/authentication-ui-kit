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
import { SocialAuthButton } from "@/components/auth/social-auth-button";

const signUpSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z
		.string()
		.min(8, {
			message: "Password must be at least 8 characters.",
		})
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
		}),
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: SignUpValues) => {
		setIsLoading(true);
		try {
			// Add your sign-up logic here
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
				<h1 className="text-3xl font-bold">Create an account</h1>
				<p className="text-muted-foreground">
					Enter your email below to create your account
				</p>
			</div>

			<div className="space-y-4">
				<div className="flex justify-center gap-2">
					<SocialAuthButton provider="google" />
					<SocialAuthButton provider="github" />
					<SocialAuthButton provider="discord" />
				</div>

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

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First name</FormLabel>
										<FormControl>
											<Input
												placeholder="John"
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
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last name</FormLabel>
										<FormControl>
											<Input
												placeholder="Doe"
												{...field}
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

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
							{isLoading ? "Creating account..." : "Create account"}
						</Button>
					</form>
				</Form>
			</div>

			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link href="/sign-in" className="text-primary hover:text-primary/90">
					Sign in
				</Link>
			</div>
		</motion.div>
	);
}
