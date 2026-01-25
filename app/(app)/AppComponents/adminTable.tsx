"use client";

import { useRef, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  ListFilterIcon,
  Check,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/* ---------- Types ---------- */
type JoinRequest = {
  id: string;
  full_name: string;
  email: string | null;
  status: "pending" | "approved" | "rejected";
  requested_at: string;
  reason: string | null;
  school: string | null;
  referrers: string[] | null;
  positions: string[] | null;
};

const ALL_STATUSES = ["pending", "approved", "rejected"] as const;

/* ---------- Fetchers ---------- */
const getJoinRequests = async ({
  page,
  limit,
  search,
  status,
}: {
  page: number;
  limit: number;
  search?: string;
  status?: string[];
}) => {
  const supabase = createClient();

  let query = supabase
    .from("organization_join_requests")
    .select("*", { count: "exact" })
    .order("requested_at", { ascending: false })
    .range(page * limit, page * limit + limit - 1);

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  if (status?.length) {
    query = query.in("status", status);
  }

  const { data, count, error } = await query;
  if (error) throw new Error(error.message);

  return { data: data ?? [], count: count ?? 0 };
};

const updateRequestStatus = async ({
  id,
  status,
}: {
  id: string;
  status: "approved" | "rejected" | "pending";
}) => {
  const supabase = createClient();

  console.log("[1] Updating join request:", { id, status });

  const { data, error } = await supabase
    .from("organization_join_requests")
    .update({ status })
    .eq("id", id)
    .select("user_id")
    .single();

  console.log("[2] Join request result:", { data, error });

  if (error) throw error;
  if (!data?.user_id) throw new Error("No user_id returned");

  const newRole = status === "approved" ? "member" : "non-member";

  const { error: userError } = await supabase
    .from("users")
    .update({ role: newRole })
    .eq("id", data.user_id)
    .select();
  if (userError) throw userError;

  toast.success(`Request ${status}`);
};

/* ---------- Columns ---------- */
const columns: ColumnDef<JoinRequest>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => (
      <div className="truncate max-w-[150px]" title={row.original.id}>
        {row.original.id}
      </div>
    ),
  },
  { header: "Full Name", accessorKey: "full_name", size: 180 },
  { header: "Email", accessorKey: "email", size: 220 },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <Badge>{row.getValue("status")}</Badge>,
    size: 100,
  },
  { header: "School", accessorKey: "school", size: 150 },
  {
    header: "Reason",
    accessorKey: "reason",
    cell: ({ row }) => {
      const reason = row.original.reason;
      if (!reason) return <span className="text-muted-foreground">—</span>;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              View
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <p className="text-sm">{reason}</p>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    header: "Positions",
    accessorKey: "positions",
    cell: ({ row }) =>
      row.original.positions?.map((p, i) => <div key={i}>{p}</div>),
  },
  {
    header: "Referrers",
    accessorKey: "referrers",
    cell: ({ row }) =>
      row.original.referrers?.map((r, i) => <div key={i}>{r}</div>),
  },
  {
    header: "Requested At",
    accessorKey: "requested_at",
    cell: ({ row }) => new Date(row.original.requested_at).toLocaleDateString(),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
  },
];

/* ---------- Component ---------- */
export default function JoinRequestsTable() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: "requested_at", desc: true },
  ]);

  const { data, isLoading } = useQuery({
    queryKey: [
      "join-requests",
      pagination.pageIndex,
      pagination.pageSize,
      search,
      statusFilter.join(","),
    ],
    queryFn: () =>
      getJoinRequests({
        page: pagination.pageIndex,
        limit: pagination.pageSize,
        search,
        status: statusFilter,
      }),
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    state: { pagination, sorting, columnVisibility },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil((data?.count ?? 0) / pagination.pageSize),
    manualPagination: true,
  });

  const handleStatusChange = (checked: boolean, value: string) => {
    setStatusFilter((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value),
    );
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Input
            ref={inputRef}
            className="min-w-60 ps-9"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPagination((p) => ({ ...p, pageIndex: 0 }));
            }}
            placeholder="Filter by full name or email..."
          />
          <ListFilterIcon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          {search && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => {
                setSearch("");
                inputRef.current?.focus();
              }}
            >
              <CircleXIcon size={16} />
            </button>
          )}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon size={16} /> Status
            </Button>
          </PopoverTrigger>
          <PopoverContent className="space-y-2">
            {ALL_STATUSES.map((s) => (
              <div key={s} className="flex items-center gap-2">
                <Checkbox
                  checked={statusFilter.includes(s)}
                  onCheckedChange={(c) => handleStatusChange(!!c, s)}
                />
                <Label>{s}</Label>
              </div>
            ))}
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns3Icon size={16} /> View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            {table
              .getAllColumns()
              .filter((c) => c.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => column.toggleVisibility(!!v)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md overflow-auto max-h-[70vh]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <Select
          value={pagination.pageSize.toString()}
          onValueChange={(v) =>
            setPagination({ pageIndex: 0, pageSize: Number(v) })
          }
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 25, 50].map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronFirstIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRightIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronLastIcon size={16} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

/* ---------- Row Actions ---------- */
function RowActions({ row }: { row: Row<JoinRequest> }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateRequestStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["join-requests"] }),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <EllipsisIcon size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              console.log("Clicked view details for", row.original.id);
              mutation.mutate({ id: row.original.id, status: "approved" });
            }}
          >
            <Check size={16} /> Approve
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              mutation.mutate({ id: row.original.id, status: "rejected" })
            }
          >
            <X size={16} /> Reject
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
