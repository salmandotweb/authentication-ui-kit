"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useApiMutation } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

const resetPasswordSchema = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export default function ResetPassword() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const { toast } = useToast();

	const { mutate: resetPassword, isPending: resettingPassword } =
		useApiMutation("/auth/reset-password", "POST", {
			onSuccess: () => {
				toast({
					title: "Success",
					description:
						"Password reset successful. You can now sign in with your new password.",
				});
				window.location.href = "/sign-in";
			},
			onError: (error) => {
				toast({
					title: "Error",
					description:
						error.response?.data?.meta?.errors?.[0] ||
						"Failed to reset password",
					variant: "destructive",
				});
			},
		});

	function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
		if (!token) {
			toast({
				title: "Error",
				description: "Invalid or missing reset token",
				variant: "destructive",
			});
			return;
		}

		resetPassword({
			params: {},
			body: {
				token,
				newPassword: values.password,
			},
		});
	}

	if (!token) {
		return (
			<div className="min-h-screen bg-[#EFFDE0] flex items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full">
					<h1 className="text-2xl font-bold text-red-500 mb-4">
						Invalid Reset Link
					</h1>
					<p className="text-gray-600 mb-6">
						This password reset link is invalid or has expired. Please request a
						new password reset link.
					</p>
					<Link href="/forgot-password">
						<Button className="w-full">Request New Reset Link</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col lg:flex-row">
			<div className="lg:w-1/3 p-8 lg:p-16 flex flex-col justify-center items-center">
				<div className="w-full max-w-md">
					<Link href="/" className="block mb-4 w-fit">
						<Image src="/images/logo.png" width={50} height={50} alt="Logo" />
					</Link>
					<h1 className="text-4xl font-bold mb-4 text-primary">
						Reset Password
					</h1>
					<p className="text-lg text-gray-600 mb-8">
						Enter your new password below to reset your account password.
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 w-full max-w-md"
					>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type={showPassword ? "text" : "password"}
												placeholder="••••••••"
												{...field}
											/>
											<button
												type="button"
												className="absolute inset-y-0 right-0 pr-3 flex items-center"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? (
													<EyeClosedIcon className="h-5 w-5" />
												) : (
													<EyeOpenIcon className="h-5 w-5" />
												)}
											</button>
										</div>
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
										<div className="relative">
											<Input
												type={showConfirmPassword ? "text" : "password"}
												placeholder="••••••••"
												{...field}
											/>
											<button
												type="button"
												className="absolute inset-y-0 right-0 pr-3 flex items-center"
												onClick={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
											>
												{showConfirmPassword ? (
													<EyeClosedIcon className="h-5 w-5" />
												) : (
													<EyeOpenIcon className="h-5 w-5" />
												)}
											</button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full"
							loading={resettingPassword}
						>
							Reset Password
						</Button>
					</form>
				</Form>
				<p className="text-sm text-gray-600 mt-6 w-full max-w-md text-center">
					Remember your password?{" "}
					<Link href="/sign-in" className="text-primary hover:underline">
						Sign in
					</Link>
				</p>
			</div>
			<div className="lg:w-2/3 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 lg:p-16 flex flex-col justify-center items-center relative">
				<Image
					src="/images/logo.png"
					height={400}
					width={400}
					alt="Logo"
					className="opacity-5"
				/>
			</div>
		</div>
	);
}
