import React from "react";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	getFilteredRowModel,
	ColumnFiltersState,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCwIcon, ChevronDown } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ClipLoader } from "react-spinners";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
	title: string;
	action?: React.ReactNode;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	filterComponent?: React.ReactNode;
	refresh?: () => void;
	loading?: boolean;
	className?: string;
}

export function DataTable<TData, TValue>({
	title,
	action,
	columns,
	data,
	filterComponent,
	refresh,
	loading,
	className,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [globalFilter, setGlobalFilter] = React.useState("");
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			columnFilters,
			globalFilter,
		},
		initialState: {
			pagination: {
				pageSize: rowsPerPage,
			},
		},
	});

	React.useEffect(() => {
		table.setPageSize(rowsPerPage);
	}, [rowsPerPage, table]);

	return (
		<Card className={cn("w-full", className)}>
			<CardHeader className="flex flex-row items-center justify-between space-y-2 sm:space-y-0">
				<CardTitle>{title}</CardTitle>
				{action}
			</CardHeader>
			<CardContent className="overflow-x-auto">
				<div className="flex flex-col md:flex-row items-start gap-2 md:items-center py-4">
					<Input
						placeholder="Filter all columns..."
						value={globalFilter ?? ""}
						onChange={(event) => setGlobalFilter(String(event.target.value))}
						className="w-[250px]"
					/>
					{filterComponent}
					<div className="flex items-center gap-2 md:justify-end ml-auto space-x-2 flex-wrap">
						<Select
							value={rowsPerPage.toString()}
							onValueChange={(value) => setRowsPerPage(Number(value))}
						>
							<SelectTrigger className="w-[120px]">
								<SelectValue placeholder="Rows per page" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="10">10 rows</SelectItem>
								<SelectItem value="20">20 rows</SelectItem>
								<SelectItem value="50">50 rows</SelectItem>
							</SelectContent>
						</Select>
						<Button
							variant="outline"
							icon={<RefreshCwIcon className="w-3 h-3" />}
							onClick={refresh}
							loading={loading}
						>
							Refresh
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="ml-auto">
									Columns
									<ChevronDown className="ml-2 h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => {
										return (
											<DropdownMenuCheckboxItem
												key={column.id}
												className="capitalize"
												checked={column.getIsVisible()}
												onCheckedChange={(value) =>
													column.toggleVisibility(!!value)
												}
											>
												{column.id}
											</DropdownMenuCheckboxItem>
										);
									})}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className=" border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id} className="text-nowrap">
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										{loading ? (
											<div className="flex items-center justify-center">
												<ClipLoader size={14} className="mr-2" />
												Loading data...
											</div>
										) : globalFilter ? (
											<div className="flex flex-col items-center justify-center text-muted-foreground">
												<p>
													No results found for <b>{globalFilter}</b>
												</p>
												<p className="text-sm">
													Try adjusting your search or filters
												</p>
											</div>
										) : (
											<div className="flex flex-col items-center justify-center text-muted-foreground">
												<p>No data available</p>
											</div>
										)}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-between space-x-2 py-4">
					<div className="text-sm text-muted-foreground">
						Showing{" "}
						{table.getState().pagination.pageIndex *
							table.getState().pagination.pageSize +
							1}{" "}
						to{" "}
						{Math.min(
							(table.getState().pagination.pageIndex + 1) *
								table.getState().pagination.pageSize,
							table.getFilteredRowModel().rows.length
						)}{" "}
						of {table.getFilteredRowModel().rows.length} results
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
