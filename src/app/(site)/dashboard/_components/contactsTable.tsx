"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/dataTable";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useApiQuery } from "@/hooks/useApi";
import { Response } from "@/interfaces/response";

interface Contact {
	id: string;
	name: string;
	totalCount: number;
	status: "active" | "inactive" | "pending";
}

const columns: ColumnDef<Contact>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "totalCount",
		header: "Total Count",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			return (
				<Badge variant={status === "active" ? "default" : "secondary"}>
					{status}
				</Badge>
			);
		},
	},
];

export function ContactsTable() {
	const [status, setStatus] = useState("active");

	const {
		data: contactsSummary,
		isFetching,
		refetch,
	} = useApiQuery<Response<Contact[]>>(
		["contacts-summary"],
		"/contacts/summary"
	);

	const filteredData = contactsSummary?.data.filter(
		(contact: Contact) => contact.status.toLowerCase() === status.toLowerCase()
	);

	const filterComponent = (
		<div className="flex space-x-2">
			<Select value={status} onValueChange={setStatus}>
				<SelectTrigger className="w-[150px]">
					<SelectValue placeholder="Status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="active">Active</SelectItem>
					<SelectItem value="inactive">Inactive</SelectItem>
					<SelectItem value="pending">Pending</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
	return (
		<DataTable
			title="Contacts List"
			columns={columns}
			data={filteredData ?? []}
			filterComponent={filterComponent}
			refresh={refetch}
			loading={isFetching}
		/>
	);
}
