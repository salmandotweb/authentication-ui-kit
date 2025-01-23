"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { ClipLoader } from "react-spinners";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/interfaces/user";
import { Response } from "@/interfaces/response";

const settingsFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First Name must be at least 2 characters.",
	}),
});

export default function SettingsForm() {
	const { data: userData } = useApiQuery<Response<User>>(["user"], "/users/me");

	const settingsForm = useForm<z.infer<typeof settingsFormSchema>>({
		resolver: zodResolver(settingsFormSchema),
		defaultValues: {
			firstName: userData?.data?.firstName || "",
		},
	});

	const { toast } = useToast();

	const { mutate: updateUser, isPending: updatingUser } = useApiMutation(
		"/users/me",
		"PATCH",
		{
			onSuccess: () => {
				toast({
					title: "Success",
					description: "Details updated successfully",
				});
			},
			onError: (error) => {
				const errorMessage =
					error.response?.data?.meta?.errors?.[0] || "Failed to update user";

				toast({
					title: "Error",
					description: errorMessage,
					variant: "destructive",
				});
			},
		}
	);

	function onSettingsSubmit(values: z.infer<typeof settingsFormSchema>) {
		updateUser({ params: {}, body: values });
	}

	return (
		<div className="space-y-8 w-full mt-4">
			<Form {...settingsForm}>
				<form
					onSubmit={settingsForm.handleSubmit(onSettingsSubmit)}
					className="space-y-8"
				>
					<FormField
						control={settingsForm.control}
						name="firstName"
						render={({ field }) => (
							<FormItem className="w-full grid grid-cols-2 gap-4">
								<div className="w-full flex justify-center flex-col">
									<FormLabel>First Name</FormLabel>
								</div>
								<div className="w-full">
									<FormControl>
										<Input placeholder="Enter your first name" {...field} />
									</FormControl>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
					<div className="w-full flex items-center justify-end">
						<Button
							type="submit"
							variant="outline"
							className="flex items-center justify-center gap-2"
							disabled={updatingUser}
						>
							Update Profile
							{updatingUser && <ClipLoader size={13} color="#000" />}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
