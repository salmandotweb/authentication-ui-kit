"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const magicLinkSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
});

type MagicLinkValues = z.infer<typeof magicLinkSchema>;

export default function MagicLinkForm() {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const form = useForm<MagicLinkValues>({
		resolver: zodResolver(magicLinkSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (values: MagicLinkValues) => {
		setIsLoading(true);
		try {
			// add magic link endpoint e.g:
			// await api.post("/auth/magic-link", values);

			// Simulate API delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			toast({
				title: "Check your email",
				description: "We've sent you a magic link to sign in.",
			});
		} catch (error: any) {
			toast({
				title: "Error",
				description: "Something went wrong",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
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
					{isLoading ? "Sending magic link..." : "Send magic link"}
				</Button>
			</form>
		</Form>
	);
}
