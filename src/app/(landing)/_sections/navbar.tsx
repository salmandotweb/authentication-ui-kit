"use client";

import { ArrowTopRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type link = {
	label: string;
	href: string;
};

const links: link[] = [
	{
		label: "Components",
		href: "/#components",
	},
	{
		label: "Features",
		href: "/#features",
	},
	{
		label: "Documentation",
		href: "/docs",
	},
	{
		label: "GitHub",
		href: "https://github.com/yourusername/auth-ui-kit",
	},
];

const Navbar = () => {
	const [toggle, setToggle] = useState(false);
	return (
		<nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b bg-background/40">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between h-16">
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/images/logo.png"
							width={32}
							height={32}
							alt={siteConfig.name}
							className="transform transition duration-300 ease-in-out"
						/>
						<span className="font-semibold text-lg hidden sm:block">
							{siteConfig.name}
						</span>
					</Link>

					<div className="hidden lg:flex items-center gap-8">
						{links.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
							>
								{link.label}
							</Link>
						))}
					</div>

					<div className="hidden lg:flex items-center gap-4">
						<Link href="/sign-in">
							<Button variant="ghost" className="font-medium">
								Sign In
							</Button>
						</Link>
						<Link href="/sign-up">
							<Button className="font-medium">
								Get Started
								<ArrowTopRightIcon className="ml-2" />
							</Button>
						</Link>
					</div>

					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden"
						onClick={() => setToggle(!toggle)}
					>
						<HamburgerMenuIcon className="h-5 w-5" />
					</Button>
				</div>
			</div>

			<AnimatePresence>
				{toggle && <MobileNavbar setToggle={setToggle} />}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;

const MobileNavbar = ({
	setToggle,
}: {
	setToggle: (toggle: boolean) => void;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.2 }}
			className="lg:hidden border-t bg-background"
		>
			<div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
				<div className="grid gap-2">
					{links.map((link) => (
						<motion.div
							key={link.label}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.1 }}
						>
							<Link
								href={link.href}
								className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
								onClick={() => setToggle(false)}
							>
								<span className="text-sm font-medium">{link.label}</span>
							</Link>
						</motion.div>
					))}
				</div>

				<div className="grid gap-2 pt-4 border-t">
					<Link href="/sign-in" onClick={() => setToggle(false)}>
						<Button variant="ghost" className="w-full justify-start">
							Sign In
						</Button>
					</Link>
					<Link href="/sign-up" onClick={() => setToggle(false)}>
						<Button className="w-full">
							Get Started
							<ArrowTopRightIcon className="ml-2" />
						</Button>
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
