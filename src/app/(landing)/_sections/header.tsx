import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./navbar";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const Header = () => {
	return (
		<header className="w-full min-h-screen flex flex-col justify-between relative">
			<Navbar />
			<div className="flex-grow flex items-center justify-center flex-col z-20 pt-20 gap-16">
				<div className="flex items-center justify-center text-center flex-col gap-4 md:gap-8 max-w-6xl px-4">
					<h1 className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">
						Modern Authentication UI Kit
					</h1>
					<p className="md:text-2xl sm:text-lg text-base font-medium max-w-lg px-4 md:px-0">
						Beautiful, responsive authentication flows built with Next.js and
						Tailwind CSS
					</p>

					<div className="flex items-center justify-center gap-4 flex-col">
						<Link href="/sign-up">
							<Button icon={<ArrowTopRightIcon />}>Get Started</Button>
						</Link>
						<p className="text-sm font-medium">Open source and free to use</p>
					</div>
				</div>

				<div className="h-[600px] flex items-center justify-center gap-5 w-full bg-primary/10"></div>
			</div>
		</header>
	);
};

export default Header;
