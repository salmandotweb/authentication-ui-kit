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

const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export default function ForgotPassword() {
	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const { toast } = useToast();

	const { mutate: sendResetLink, isPending: sendingResetLink } = useApiMutation(
		"/auth/forgot-password",
		"POST",
		{
			onSuccess: () => {
				toast({
					title: "Success",
					description: "Password reset link sent to your email",
				});
			},
			onError: (error) => {
				toast({
					title: "Error",
					description: "Failed to send password reset link",
					variant: "destructive",
				});
			},
		}
	);

	function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
		sendResetLink({ params: {}, body: values });
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
						Enter your email address and we&apos;ll send you instructions to
						reset your password.
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
						<Button type="submit" className="w-full" loading={sendingResetLink}>
							Send Reset Link
						</Button>
					</form>
				</Form>
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
