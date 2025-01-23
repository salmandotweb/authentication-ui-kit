"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface PageHeaderProps {
	title: string;
	description?: string;
	children?: React.ReactNode;
	backButton?: boolean;
}

const PageHeader = ({
	title,
	description,
	children,
	backButton = false,
}: PageHeaderProps) => {
	const router = useRouter();

	return (
		<div className="flex justify-between items-start w-full sm:items-center sm:flex-row flex-col">
			<div className="flex items-center gap-1">
				{backButton && (
					<Button onClick={() => router.back()} variant="link" size="sm">
						<ArrowLeft className="h-5 w-5" />
					</Button>
				)}
				<h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
				{description && (
					<p className="text-lg font-medium text-muted-foreground mt-2">
						{description}
					</p>
				)}
			</div>
			{children && <div className="mt-4 sm:mt-0 ml-auto">{children}</div>}
		</div>
	);
};

export default PageHeader;
