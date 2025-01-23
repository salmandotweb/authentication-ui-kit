"use client";

import { KPICard } from "@/components/KPICard";
import PageHeader from "@/components/pageheader";
import { TbBuildingSkyscraper, TbMail } from "react-icons/tb";
import { RiContactsLine } from "react-icons/ri";
import { MdOutlineAttachEmail } from "react-icons/md";
import DistributionChart from "./_charts/distributionChart";
import ContactsDistributionChart from "./_charts/contactsDistributionChart";
import { ContactsTable } from "@/app/(site)/dashboard/_components/contactsTable";
import { useApiQuery } from "@/hooks/useApi";
import { Response } from "@/interfaces/response";
import ScrapingJobsChart from "./_charts/scrappingJobsChart";

interface StatWithChange {
	count: number;
	change: number;
}

interface UserStats {
	scrapingJobs: StatWithChange;
	emailCampaigns: StatWithChange;
	contactLists: StatWithChange;
	emailConnections: StatWithChange;
}

interface Distribution {
	completed: number;
	failed: number;
	pending: number;
	running: number;
}

export default function Dashboard() {
	const { data: stats } = useApiQuery<Response<UserStats>>(
		["stats"],
		"/users/stats"
	);

	const { data: distribution } = useApiQuery<Response<Distribution>>(
		["distribution"],
		"/scraping-jobs/distribution"
	);

	const KPIs = [
		{
			label: "Total Scraping Job",
			value: stats?.data.scrapingJobs.count ?? 0,
			change: stats?.data.scrapingJobs.change ?? 0,
			icon: TbBuildingSkyscraper,
		},
		{
			label: "Total Email Campaigns",
			value: stats?.data.emailCampaigns.count ?? 0,
			change: stats?.data.emailCampaigns.change ?? 0,
			icon: TbMail,
		},
		{
			label: "Total Contact List",
			value: stats?.data.contactLists.count ?? 0,
			change: stats?.data.contactLists.change ?? 0,
			icon: RiContactsLine,
		},
		{
			label: "Total Connected Mail",
			value: stats?.data.emailConnections.count ?? 0,
			change: stats?.data.emailConnections.change ?? 0,
			icon: MdOutlineAttachEmail,
		},
	];

	return (
		<div className="w-full h-full flex flex-col items-start gap-4 sm:gap-6 rounded-lg">
			<PageHeader title="Dashboard" />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
				{KPIs.map((kpi, index) => (
					<KPICard kpi={kpi} key={index} />
				))}
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
				<div className="lg:col-span-2">
					<ScrapingJobsChart />
				</div>
				<DistributionChart distribution={distribution?.data} />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
				<div className="h-[400px]">
					<ContactsDistributionChart />
				</div>
				<div className="lg:col-span-2">
					<ContactsTable />
				</div>
			</div>
		</div>
	);
}
