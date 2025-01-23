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
import { Checkbox } from "@/components/ui/checkbox";
import {
	ArrowRightIcon,
	CheckIcon,
	EyeOpenIcon,
	EyeClosedIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useApiMutation } from "@/hooks/useApi";
import { setCookie } from "cookies-next";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "@/components/icons/google";
import { useErrorToast } from "@/hooks/useErrorToast";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site";

const signUpSchema = z.object({
	fullName: z.string().min(2, "Full name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	agreeTerms: z.boolean().refine((val) => val === true, {
		message: "You must agree to the terms and conditions",
	}),
});

export default function SignUp() {
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			agreeTerms: false,
		},
	});

	const { toast } = useToast();

	const showErrorToast = useErrorToast();

	const { mutate: signupWithGoogle, isPending: signingupWithGoogle } =
		useApiMutation<any>("/auth/google", "POST", {
			onSuccess: (data: {
				success: boolean;
				data: { access_token: string; user: { id: string } };
			}) => {
				setCookie("authToken", data.data.access_token);

				window.location.href = "/dashboard";
			},
			onError: (error) => {
				console.error("Error during Google login:", error);
				showErrorToast(error);
			},
		});

	const { mutate: signupEmail, isPending: signingupEmail } = useApiMutation(
		"/auth/signup",
		"POST",
		{
			onSuccess: () => {
				toast({
					title: "Sign up successful",
					description: "Please check your email for verification!",
				});
			},
			onError: (error) => {
				showErrorToast(error);
			},
		}
	);

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
		onError: (error) => showErrorToast(error),
	});

	function onSubmit(values: z.infer<typeof signUpSchema>) {
		signupEmail({
			params: {},
			body: {
				...values,
				firstName: values.fullName.split(" ")[0],
				lastName: values.fullName.split(" ")[1],
			},
		});
	}

	return (
		<div className="min-h-screen flex flex-col lg:flex-row">
			<div className="lg:w-1/3 p-8 lg:p-16 flex flex-col justify-center items-center">
				<div className="w-full max-w-md">
					<Link href="/" className="block mb-4 w-fit">
						<Image src="/images/logo.png" width={50} height={50} alt="Logo" />
					</Link>
					<h1 className="text-4xl font-bold mb-4 text-primary">
						Create your account
					</h1>
					<p className="text-lg text-gray-600 mb-8">
						Join thousands of users to get started with our platform.
					</p>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 w-full max-w-md"
					>
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input placeholder="John Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<FormField
							control={form.control}
							name="agreeTerms"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>
											I agree to the{" "}
											<Link
												href="/terms"
												className="text-primary hover:underline"
											>
												terms and conditions
											</Link>
										</FormLabel>
									</div>
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" loading={signingupEmail}>
							Sign Up <ArrowRightIcon className="ml-2" />
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
							Sign up with Google
						</Button>
					</form>
				</Form>
				<p className="text-sm text-gray-600 mt-6 w-full max-w-md text-center">
					Already have an account?{" "}
					<Link href="/sign-in" className="text-primary hover:underline">
						Sign in
					</Link>
				</p>
			</div>
			<div className="lg:w-2/3 bg-gradient-to-br from-primary/5 to-secondary/10 p-8 lg:p-16 flex flex-col justify-center items-center">
				<div className="max-w-md">
					<h2 className="text-3xl font-semibold mb-8 text-primary">
						Why choose our platform?
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
		title: "Modern Technology Stack",
		description:
			"Built with cutting-edge technologies ensuring optimal performance and reliability.",
	},
	{
		title: "Developer Friendly",
		description:
			"Comprehensive documentation, SDKs, and APIs for seamless integration.",
	},
	{
		title: "24/7 Support",
		description:
			"Round-the-clock technical support and dedicated customer service.",
	},
];
