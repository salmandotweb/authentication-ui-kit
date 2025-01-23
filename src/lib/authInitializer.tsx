import { AuthProvider } from "@/contexts/authContext";
import { getCurrentUser } from "./getCurrentUser";

export default async function AuthInitializer({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getCurrentUser();

	return <AuthProvider initialUser={user}>{children}</AuthProvider>;
}
