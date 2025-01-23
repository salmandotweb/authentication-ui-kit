"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
import { useToast } from "@/hooks/use-toast";
import { FiMail } from "react-icons/fi";

const forgotPasswordSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
	const [isLoading, setIsLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);
	const { toast } = useToast();

	const form = useForm<ForgotPasswordValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (values: ForgotPasswordValues) => {
		setIsLoading(true);
		try {
			// Add your password reset API call here
			// For demo, we'll just simulate a delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			setEmailSent(true);
			toast({
				title: "Reset link sent!",
				description: "Check your email for password reset instructions.",
			});
		} catch (error: any) {
			toast({
				title: "Error",
				description:
					error?.message || "Something went wrong. Please try again.",
				variant: "destructive",
			});
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
				<div className="flex justify-center mb-4">
					<FiMail className="w-8 h-8 text-primary" />
				</div>
				<h1 className="text-3xl font-bold">Reset your password</h1>
				<p className="text-muted-foreground">
					Enter your email address and we'll send you instructions to reset your
					password.
				</p>
			</div>

			{emailSent ? (
				<div className="space-y-4">
					<div className="p-4 bg-primary/10 rounded-lg text-center space-y-2">
						<p className="font-medium">Check your inbox</p>
						<p className="text-sm text-muted-foreground">
							We've sent you a password reset link. The link will expire in 1
							hour.
						</p>
					</div>
					<Button className="w-full" onClick={() => setEmailSent(false)}>
						Didn't receive the email? Try again
					</Button>
				</div>
			) : (
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

						<Button className="w-full" type="submit" disabled={isLoading}>
							{isLoading ? "Sending reset link..." : "Send reset link"}
						</Button>
					</form>
				</Form>
			)}

			<div className="text-center text-sm">
				Remember your password?{" "}
				<Link href="/sign-in" className="text-primary hover:text-primary/90">
					Sign in
				</Link>
			</div>
		</motion.div>
	);
}
