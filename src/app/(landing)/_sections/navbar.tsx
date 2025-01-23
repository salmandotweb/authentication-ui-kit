"use client";

import { ArrowTopRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Fragment, useState } from "react";
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
		<nav className="flex items-center justify-between w-full mx-auto px-5 py-6 relative">
			<div className="grid grid-cols-3 w-full gap-4">
				<Link href="/">
					<Image
						src="/images/logo.png"
						width={40}
						height={40}
						alt={siteConfig.name}
						className="transform transition duration-300 ease-in-out"
					/>
				</Link>
				<div className="items-center justify-center hidden lg:flex gap-10">
					{links.map((link) => (
						<Fragment key={link.label}>
							<Link
								href={link.href}
								className="text-sm lg:text-base font-medium text-primary hover:underline"
							>
								{link.label}
							</Link>
						</Fragment>
					))}
				</div>
				<div className="hidden lg:flex items-center justify-end gap-3">
					<Link href="/sign-in">
						<Button variant="link">Sign In</Button>
					</Link>
					<Link href="/sign-up">
						<Button className="flex items-center gap-2">
							Get Started
							<ArrowTopRightIcon />
						</Button>
					</Link>
				</div>
			</div>
			<div className="lg:hidden flex items-center gap-4">
				<Button variant="ghost" size="icon" onClick={() => setToggle(!toggle)}>
					<HamburgerMenuIcon className="h-6 w-6" />
				</Button>
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
			className="absolute top-full left-0 right-0 mt-2 p-4 bg-[#DEF4C6] rounded-lg shadow-lg z-50"
		>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					{links.map((link) => (
						<motion.div
							key={link.label}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.1 }}
						>
							<Link
								href={link.href}
								className="text-primary hover:text-primary/80 text-sm font-medium p-2"
								onClick={() => setToggle(false)}
							>
								{link.label}
							</Link>
						</motion.div>
					))}
				</div>

				<div className="border-t pt-4 flex flex-col gap-2">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
					>
						<Link href="/sign-in" onClick={() => setToggle(false)}>
							<Button variant="link" className="w-full justify-start">
								Sign In
							</Button>
						</Link>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
					>
						<Link href="/sign-up" onClick={() => setToggle(false)}>
							<Button className="w-full flex items-center gap-2">
								Get Started
								<ArrowTopRightIcon />
							</Button>
						</Link>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};
