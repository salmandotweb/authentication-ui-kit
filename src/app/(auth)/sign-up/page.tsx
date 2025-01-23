"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
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
import { SocialAuthButton } from "@/components/auth/social-auth-button";
import { useToast } from "@/hooks/use-toast";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const emailSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
});

const passwordSchema = z.object({
	password: z
		.string()
		.min(8, {
			message: "Password must be at least 8 characters.",
		})
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, and one number.",
		}),
});

const personalDetailsSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
});

// Combine schemas for final submission
const signUpSchema = emailSchema
	.merge(passwordSchema)
	.merge(personalDetailsSchema);

type SignUpValues = z.infer<typeof signUpSchema>;

type Step = {
	title: string;
	description: string;
	fields: (keyof SignUpValues)[];
	validationSchema: z.ZodType<any>;
	icon: React.ReactNode;
};

const steps: Step[] = [
	{
		title: "Let's get started",
		description:
			"Enter your email to create your account and start your journey",
		fields: ["email"],
		validationSchema: emailSchema,
		icon: <FiMail className="w-8 h-8 text-primary" />,
	},
	{
		title: "Create a password",
		description: "Choose a strong password to keep your account secure",
		fields: ["password"],
		validationSchema: passwordSchema,
		icon: <FiLock className="w-8 h-8 text-primary" />,
	},
	{
		title: "Personal details",
		description: "Help us personalize your experience",
		fields: ["firstName", "lastName"],
		validationSchema: personalDetailsSchema,
		icon: <FiUser className="w-8 h-8 text-primary" />,
	},
];

export default function SignUp() {
	const [isLoading, setIsLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (values: SignUpValues) => {
		if (currentStep < steps.length - 1) {
			const currentFields = steps[currentStep].fields;
			const currentStepSchema = steps[currentStep].validationSchema;
			const stepValues = Object.fromEntries(
				currentFields.map((field) => [field, values[field]])
			);

			try {
				await currentStepSchema.parseAsync(stepValues);
				setCurrentStep(currentStep + 1);
				form.clearErrors();
			} catch (error) {
				return;
			}
		} else {
			setIsLoading(true);
			try {
				const validatedData = await signUpSchema.parseAsync(values);
				console.log("Form data:", validatedData);

				// add your sign up api call here, for now we are just simulating a delay
				await new Promise((resolve) => setTimeout(resolve, 1000));

				toast({
					title: "Account created!",
					description: "Welcome aboard! Redirecting you to dashboard...",
				});

				await new Promise((resolve) => setTimeout(resolve, 500));

				// update the auth token in the cookie
				setCookie("authToken", "demo-token");
				router.push("/dashboard");
			} catch (error: any) {
				console.error("Sign up error:", error);
				toast({
					title: "Error",
					description:
						error?.message || "Something went wrong. Please try again.",
					variant: "destructive",
				});
			} finally {
				setIsLoading(false);
			}
		}
	};

	const watchedValues = form.watch();
	console.log("Current form values:", watchedValues);

	const currentStepFields = steps[currentStep].fields;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="space-y-6 w-full max-w-md"
		>
			<div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
				<div
					className="h-full bg-primary transition-all duration-300"
					style={{
						width: `${((currentStep + 1) / steps.length) * 100}%`,
					}}
				/>
			</div>

			<div className="space-y-2 text-center">
				<div className="flex justify-center mb-4">
					{steps[currentStep].icon}
				</div>
				<h1 className="text-3xl font-bold">{steps[currentStep].title}</h1>
				<p className="text-muted-foreground">
					{steps[currentStep].description}
				</p>
			</div>

			<div className="space-y-4">
				{currentStep === 0 && (
					<>
						<div className="flex items-center justify-center gap-3">
							<SocialAuthButton provider="google" />
							<SocialAuthButton provider="github" />
							<SocialAuthButton provider="discord" />
						</div>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Or continue with email
								</span>
							</div>
						</div>
					</>
				)}

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div
							className={
								currentStep === 2 ? "grid grid-cols-2 gap-4" : "space-y-4"
							}
						>
							{currentStepFields.map((field) => (
								<FormField
									key={field}
									control={form.control}
									name={field}
									render={({ field: fieldProps }) => (
										<FormItem>
											<FormLabel className="capitalize">
												{field.replace(/([A-Z])/g, " $1").trim()}
											</FormLabel>
											<FormControl>
												<Input
													type={field === "password" ? "password" : "text"}
													placeholder={
														field === "email"
															? "m@example.com"
															: field === "password"
															? "********"
															: field === "firstName"
															? "John"
															: "Doe"
													}
													{...fieldProps}
													disabled={isLoading}
													className="h-11"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>

						<div className="flex gap-3 pt-4">
							{currentStep > 0 && (
								<Button
									type="button"
									variant="outline"
									className="w-full h-11"
									onClick={() => setCurrentStep(currentStep - 1)}
									disabled={isLoading}
								>
									Back
								</Button>
							)}
							<Button
								className="w-full h-11"
								type="submit"
								disabled={isLoading}
							>
								{isLoading
									? currentStep === steps.length - 1
										? "Creating account..."
										: "Please wait..."
									: currentStep < steps.length - 1
									? "Continue"
									: "Create account"}
							</Button>
						</div>
					</form>
				</Form>
			</div>

			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link
					href="/sign-in"
					className="text-primary hover:text-primary/90 font-medium"
				>
					Sign in
				</Link>
			</div>

			<div className="flex justify-center gap-2">
				{steps.map((_, index) => (
					<div
						key={index}
						className={`w-2 h-2 rounded-full transition-colors duration-300 ${
							index === currentStep
								? "bg-primary"
								: index < currentStep
								? "bg-primary/40"
								: "bg-secondary"
						}`}
					/>
				))}
			</div>
		</motion.div>
	);
}
