import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/interfaces/user";
import { PersonIcon } from "@radix-ui/react-icons";

const Profile = ({
	user,
}: {
	user: User & { position: string; totalSales: number; totalRevenue: number };
}) => {
	return (
		<div className="w-full h-[420px] bg-primary/80 rounded-3xl p-3 flex flex-col items-center justify-between">
			<div className="w-full px-3 py-2 rounded-full bg-white/10 text-white flex items-center justify-between cursor-pointer hover:bg-white/20 transition-all duration-300">
				<p className="text-sm font-medium">Your Profile</p>
				<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
					<PersonIcon className="w-4 h-4" />
				</div>
			</div>
			<div className="flex flex-col w-full items-center justify-center gap-4 text-white">
				<Avatar className="w-32 h-32 rounded-full">
					<AvatarImage src={user.avatarUrl || ""} />
					<AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col items-center justify-center">
					<p className="text-md font-semibold">{user.position}</p>
					<p className="text-md font-normal">{user.email}</p>
				</div>

				<div className="grid grid-cols-2 gap-2 w-full text-primary">
					<div className="w-full rounded-2xl bg-white p-4 flex items-center justify-center flex-col h-[100px]">
						<p className="text-sm font-medium">Total Sales</p>
						<p className="text-md font-semibold">{user.totalSales}</p>
					</div>
					<div className="w-full rounded-2xl bg-white p-4 flex items-center justify-center flex-col h-[100px]">
						<p className="text-sm font-medium">Total Revenue</p>
						<p className="text-md font-semibold">
							${user.totalRevenue.toLocaleString()}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
