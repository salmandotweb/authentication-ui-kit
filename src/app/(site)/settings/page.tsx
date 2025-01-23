import { Separator } from "@/components/ui/separator";
import SettingsForm from "./form";

export default async function Settings() {
	return (
		<div className="p-5 flex-grow h-full flex flex-col items-start gap-4 rounded-lg overflow-y-auto">
			<h1 className="text-3xl font-bold">Settings</h1>

			<Separator />

			<SettingsForm />
		</div>
	);
}
