import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { User } from "@/interfaces/user";

interface AvatarUploadDialogProps {
	user: User;
	onAvatarChange?: (file: File) => void;
}

export function AvatarUploadDialog({
	user,
	onAvatarChange,
}: AvatarUploadDialogProps) {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
			onAvatarChange?.(file);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Change Avatar</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Change Avatar</DialogTitle>
				</DialogHeader>
				<div className="space-y-6 py-4">
					<div className="flex items-center justify-center">
						<Avatar className="w-32 h-32">
							<AvatarImage src={previewUrl || user.avatarUrl || ""} />
							<AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
						</Avatar>
					</div>
					<div className="flex flex-col gap-4">
						<Input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="cursor-pointer"
						/>
						<div className="flex justify-end gap-2">
							<Button variant="outline" onClick={() => setIsOpen(false)}>
								Cancel
							</Button>
							<Button onClick={() => setIsOpen(false)}>Save</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
