"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useErrorToast } from "@/hooks/useErrorToast";
import { useApiQuery } from "@/hooks/useApi";
import { setCookie } from "cookies-next";
import { Response } from "@/interfaces/response";

export default function MagicLinkCallback() {
	const searchParams = useSearchParams();
	const showErrorToast = useErrorToast();

	const token = searchParams.get("token") || "";

	const {
		data: tokenData,
		isError,
		error,
		isLoading,
	} = useApiQuery<Response<{ access_token: string }>>(
		["token", token],
		`/auth/verify?token=${token}`,
		{
			enabled: !!token,
		}
	);

	useEffect(() => {
		if (tokenData) {
			setCookie("authToken", tokenData.data.access_token);

			window.location.href = "/dashboard";
		} else if (isError) {
			showErrorToast(error);
		}
	}, [tokenData]);

	if (!token) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>
					Invalid or missing token. Please check your email for the correct
					link.
				</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Loading...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>{error && (error as any)?.response?.data?.meta?.errors?.[0]}</p>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<p>Authenticating...</p>
		</div>
	);
}
