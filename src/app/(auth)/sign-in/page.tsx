"use client";

import { useEffect, useState } from "react";
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
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import GoogleIcon from "@/components/icons/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useApiMutation } from "@/hooks/useApi";
import { setCookie, deleteCookie } from "cookies-next";
import { useErrorToast } from "@/hooks/useErrorToast";
import { Response } from "@/interfaces/response";
import { useSearchParams } from "next/navigation";

const signInSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SignIn() {
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const searchParams = useSearchParams();
	const redirect = searchParams.get("redirect");
	const priceId = searchParams.get("priceId");

	const showErrorToast = useErrorToast();

	const [showPassword, setShowPassword] = useState(false);

	const { mutate: signInEmail, isPending: signingInEmail } = useApiMutation<
		Response<{ access_token: string }>
	>("/auth/signin", "POST", {
		onSuccess: (data) => {
			setCookie("authToken", data.data.access_token);

			if (redirect === "checkout" && priceId) {
				window.location.href = `/checkout?priceId=${priceId}`;
			} else {
				window.location.href = "/dashboard";
			}
		},
		onError: (error) => {
			showErrorToast(error);
		},
	});

	const { mutate: signupWithGoogle, isPending: signingupWithGoogle } =
		useApiMutation<any>("/auth/google", "POST", {
			onSuccess: (data: {
				success: boolean;
				data: { access_token: string; user: { id: string } };
			}) => {
				setCookie("authToken", data.data.access_token);

				if (redirect === "checkout" && priceId) {
					window.location.href = `/checkout?priceId=${priceId}`;
				} else {
					window.location.href = "/dashboard";
				}
			},
			onError: (error) => {
				console.error("Error during Google login:", error);
			},
		});

	const login = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			try {
				const userInfo = await axios.get(
					"https://www.googleapis.com/oauth2/v3/userinfo",
					{
						headers: {
							Authorization: `Bearer ${tokenResponse.access_token}`,
						},
					}
				);

				signupWithGoogle({ params: {}, body: userInfo.data });
			} catch (error: any) {
				console.error(
					"Error during Google login:",
					error.response?.data || error.message
				);
			}
		},
		onError: () => console.error("Google Login Error"),
	});

	function onSubmit(values: z.infer<typeof signInSchema>) {
		signInEmail({ params: {}, body: values });
	}

	return (
		<div className="min-h-screen flex flex-col lg:flex-row">
			<div className="lg:w-1/3 p-8 lg:p-16 flex flex-col justify-center items-center">
				<div className="w-full max-w-md">
					<Link href="/" className="block mb-4 w-fit">
						<Image src="/images/logo.png" width={50} height={50} alt="Logo" />
					</Link>
					<h1 className="text-4xl font-bold mb-4 text-primary">Welcome back</h1>
					<p className="text-lg text-gray-600 mb-8">
						Sign in to your account to continue.
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 w-full max-w-md"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="john@example.com" {...field} />
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
						<div className="flex justify-between items-center">
							<Link
								href="/forgot-password"
								className="text-sm text-primary hover:underline"
							>
								Forgot Password?
							</Link>
						</div>
						<Button type="submit" className="w-full" loading={signingInEmail}>
							Sign In
						</Button>
						<Separator />
						<Button
							variant="outline"
							onClick={() => login()}
							loading={signingupWithGoogle}
							className="w-full"
							type="button"
						>
							<GoogleIcon />
							Sign In with Google
						</Button>
					</form>
				</Form>
				<p className="text-sm text-gray-600 mt-6 w-full max-w-md text-center">
					Don&apos;t have an account?{" "}
					<Link href="/sign-up" className="text-primary hover:underline">
						Sign up
					</Link>
				</p>
			</div>
			<div className="lg:w-2/3 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 lg:p-16 flex flex-col justify-center items-center">
				<div className="max-w-md">
					<h2 className="text-3xl font-semibold mb-8 text-primary">
						Platform Benefits
					</h2>
					{features.map((feature, index) => (
						<div key={index} className="flex items-start space-x-3 mb-6">
							<div className="mt-1">
								<CheckIcon className="h-5 w-5 text-green-500" />
							</div>
							<div>
								<h3 className="font-semibold text-lg">{feature.title}</h3>
								<p className="text-gray-600">{feature.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

const features = [
	{
		title: "Secure Authentication",
		description:
			"Enterprise-grade security with multi-factor authentication and encrypted data storage.",
	},
	{
		title: "Easy Integration",
		description:
			"Simple API integration with comprehensive documentation and developer support.",
	},
	{
		title: "Real-time Updates",
		description:
			"Stay synchronized with instant updates and seamless data synchronization.",
	},
	{
		title: "Scalable Infrastructure",
		description:
			"Built to scale with your needs, from startups to enterprise solutions.",
	},
];

const CheckIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		fill="none"
		height="24"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		viewBox="0 0 24 24"
		width="24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<polyline points="20 6 9 17 4 12" />
	</svg>
);
