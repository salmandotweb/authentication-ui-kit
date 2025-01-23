"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
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
import { FiLock } from "react-icons/fi";

const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, {
				message: "Password must be at least 8 characters.",
			})
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
				message:
					"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const { toast } = useToast();

	const form = useForm<ResetPasswordValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (values: ResetPasswordValues) => {
		const token = searchParams.get("token");

		if (!token) {
			toast({
				title: "Error",
				description: "Invalid reset token",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);
		try {
			// Add your password reset API call here
			// For demo, we'll just simulate a delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast({
				title: "Success!",
				description:
					"Your password has been reset. Please sign in with your new password.",
			});
			router.push("/sign-in");
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
					<FiLock className="w-8 h-8 text-primary" />
				</div>
				<h1 className="text-3xl font-bold">Create new password</h1>
				<p className="text-muted-foreground">
					Your new password must be different from previously used passwords.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>New Password</FormLabel>
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

					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm New Password</FormLabel>
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

					<div className="space-y-2">
						<Button className="w-full" type="submit" disabled={isLoading}>
							{isLoading ? "Resetting password..." : "Reset password"}
						</Button>
					</div>
				</form>
			</Form>

			<div className="space-y-2">
				<div className="h-[2px] bg-border relative">
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="bg-background px-2 text-xs text-muted-foreground">
							Password requirements
						</span>
					</div>
				</div>
				<ul className="space-y-2 text-sm pt-4 text-muted-foreground">
					<li className="flex items-center gap-2">
						<div className="h-1.5 w-1.5 rounded-full bg-primary" />
						At least 8 characters long
					</li>
					<li className="flex items-center gap-2">
						<div className="h-1.5 w-1.5 rounded-full bg-primary" />
						Contains at least one uppercase letter
					</li>
					<li className="flex items-center gap-2">
						<div className="h-1.5 w-1.5 rounded-full bg-primary" />
						Contains at least one lowercase letter
					</li>
					<li className="flex items-center gap-2">
						<div className="h-1.5 w-1.5 rounded-full bg-primary" />
						Contains at least one number
					</li>
				</ul>
			</div>
		</motion.div>
	);
}
