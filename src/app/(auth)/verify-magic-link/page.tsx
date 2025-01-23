"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import { useToast } from "@/hooks/use-toast";

export default function VerifyMagicLink() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { toast } = useToast();

	useEffect(() => {
		const token = searchParams.get("token");

		if (!token) {
			toast({
				title: "Error",
				description: "Invalid magic link",
				variant: "destructive",
			});
			router.push("/sign-in");
			return;
		}

		const verifyToken = async () => {
			try {
				// add verify magic link endpoint e.g:
				// const response = await api.post("/auth/verify-magic-link", { token });

				// Simulate API delay
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// For demo purposes, setting a dummy token
				setCookie("authToken", "demo-token");
				router.push("/dashboard");
			} catch (error: any) {
				toast({
					title: "Error",
					description: "Invalid magic link",
					variant: "destructive",
				});
				router.push("/sign-in");
			}
		};

		verifyToken();
	}, [router, searchParams, toast]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h1 className="text-2xl font-bold mb-2">Verifying magic link...</h1>
				<p className="text-muted-foreground">
					Please wait while we sign you in.
				</p>
			</div>
		</div>
	);
}
