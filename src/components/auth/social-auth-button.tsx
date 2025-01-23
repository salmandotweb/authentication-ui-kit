import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { useState } from "react";

interface SocialAuthButtonProps {
	provider: "google" | "github" | "discord";
	className?: string;
	text?: string;
}

const providerIcons = {
	google: FcGoogle,
	github: FaGithub,
	discord: FaDiscord,
};

const providerColors = {
	google: "hover:bg-gray-100",
	github: "bg-[#24292e] hover:bg-[#24292e]/90 text-white",
	discord: "bg-[#5865F2] hover:bg-[#5865F2]/90 text-white",
};

export function SocialAuthButton({
	provider,
	className,
}: SocialAuthButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const Icon = providerIcons[provider];

	const handleClick = async () => {
		setIsLoading(true);
		try {
			// Add your social auth logic here
			console.log(`Authenticating with ${provider}`);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant="outline"
			size="icon"
			className={cn(
				"rounded-full w-10 h-10",
				providerColors[provider],
				className
			)}
			onClick={handleClick}
			disabled={isLoading}
		>
			{isLoading ? (
				<span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
			) : (
				<Icon className="h-4 w-4" />
			)}
		</Button>
	);
}
