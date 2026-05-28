"use client";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Search,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { suppliersData, Supplier } from "@/lib/mock-data";
import { useIsClient } from "@/hooks/useIsClient";

// ─── Helpers ──────────────────────────────────────────────────────────────────

type SortField = keyof Pick<
  Supplier,
  | "name"
  | "country"
  | "status"
  | "rating"
  | "leadTimeDays"
  | "totalOrders"
  | "onTimeRate"
  | "lastOrderDate"
>;
type SortDir = "asc" | "desc";

const CATEGORIES = [
  "All",
  "Mechanical",
  "Electronics",
  "Fasteners",
  "Plumbing",
];
const STATUSES = ["All", "Active", "Under Review", "Inactive"];
const PAGE_SIZES = ["5", "10", "20"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-foreground text-background border-foreground";
    case "Under Review":
      return "bg-muted text-foreground border-border";
    case "Inactive":
      return "bg-transparent text-muted-foreground border-dashed border-muted-foreground";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < rating
              ? "fill-foreground text-foreground"
              : "fill-muted text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

function SortIcon({
  field,
  active,
  dir,
}: {
  field: string;
  active: boolean;
  dir: SortDir;
}) {
  if (!active) return <ArrowUpDown className="w-3.5 h-3.5 opacity-30 ml-1" />;
  return dir === "asc" ? (
    <ArrowUp className="w-3.5 h-3.5 ml-1" />
  ) : (
    <ArrowDown className="w-3.5 h-3.5 ml-1" />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FullSupplierTable() {
  const isClient = useIsClient();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let data = suppliersData.filter((s) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.contactName.toLowerCase().includes(q) ||
        s.contactEmail.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q);
      const matchCat =
        categoryFilter === "All" || s.categories.includes(categoryFilter);
      const matchStatus =
        statusFilter === "All" || s.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });

    return [...data].sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [search, categoryFilter, statusFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allPageSelected =
    paginated.length > 0 && paginated.every((s) => selected.has(s.id));

  function toggleSort(field: SortField) {
    if (field === sortField) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  function toggleAll() {
    const ids = paginated.map((s) => s.id);
    setSelected((prev) => {
      const next = new Set(prev);
      if (allPageSelected) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function resetFilters() {
    setSearch("");
    setCategoryFilter("All");
    setStatusFilter("All");
    setPage(1);
  }

  const hasFilters =
    search || categoryFilter !== "All" || statusFilter !== "All";

  const SortableTH = ({
    field,
    label,
    className = "",
  }: {
    field: SortField;
    label: string;
    className?: string;
  }) => (
    <TableHead
      className={`cursor-pointer select-none hover:text-foreground transition-colors ${className}`}
      onClick={() => toggleSort(field)}
    >
      <span className="flex items-center">
        {label}
        <SortIcon field={field} active={sortField === field} dir={sortDir} />
      </span>
    </TableHead>
  );

  if (!isClient) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="py-8"
    >
      {/* ── Section header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">All Suppliers</h2>
          <p className="text-sm text-muted-foreground">
            Full directory with search, sort, and filters
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers, contacts, city…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 bg-background/50"
            />
          </div>

          {/* Category filter */}
          <Select
            value={categoryFilter}
            onValueChange={(v) => {
              setCategoryFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36 border-border bg-background/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status filter */}
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36 border-border bg-background/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Reset */}
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-foreground gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* ── Bulk actions ── */}
      {selected.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium"
        >
          <span>{selected.size} selected</span>
          <div className="flex-1" />
          <Button
            size="sm"
            variant="secondary"
            className="h-7 text-xs"
            onClick={() => setSelected(new Set())}
          >
            Deselect all
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="h-7 text-xs"
            onClick={() => setSelected(new Set())}
          >
            Remove
          </Button>
        </motion.div>
      )}

      {/* ── Table ── */}
      <div className="rounded-2xl border border-border/50 overflow-hidden glass">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {/* Select all */}
              <TableHead className="w-10 px-4">
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={toggleAll}
                  className="rounded border-border cursor-pointer accent-primary"
                />
              </TableHead>
              <SortableTH field="name" label="Supplier" className="w-56" />
              <SortableTH field="country" label="Location" />
              <TableHead>Categories</TableHead>
              <SortableTH field="rating" label="Rating" />
              <SortableTH
                field="onTimeRate"
                label="On-Time %"
                className="text-center"
              />
              <SortableTH field="leadTimeDays" label="Lead Time" />
              <SortableTH field="status" label="Status" />
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-16 text-center text-muted-foreground"
                >
                  <p className="font-medium">No suppliers match your filters.</p>
                  <p className="text-xs mt-1">
                    Try adjusting your search or filter criteria.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((supplier) => (
                <TableRow
                  key={supplier.id}
                  className={`hover:bg-muted/30 transition-colors group border-b border-border/50 ${
                    selected.has(supplier.id) ? "bg-muted/20" : ""
                  }`}
                >
                  {/* Checkbox */}
                  <TableCell className="px-4">
                    <input
                      type="checkbox"
                      checked={selected.has(supplier.id)}
                      onChange={() => toggleRow(supplier.id)}
                      className="rounded border-border cursor-pointer accent-primary"
                    />
                  </TableCell>

                  {/* Supplier */}
                  <TableCell className="font-medium">
                    <div className="flex items-start gap-3">
                      {/* Avatar — initials */}
                      <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 text-xs font-bold tracking-tight text-foreground/70">
                        {supplier.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                          {supplier.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Mail className="w-2.5 h-2.5 shrink-0" />
                          <span className="truncate">{supplier.contactEmail}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Location */}
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{supplier.city}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground/60 mt-0.5 ml-4">
                      {supplier.country}
                    </div>
                  </TableCell>

                  {/* Categories */}
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {supplier.categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="text-[10px] font-normal border-border bg-muted/30 px-1.5 py-0"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>

                  {/* Rating */}
                  <TableCell>
                    <StarRating rating={supplier.rating} />
                  </TableCell>

                  {/* On-Time % */}
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`font-semibold tabular-nums text-sm ${
                          supplier.onTimeRate >= 95
                            ? "text-foreground"
                            : supplier.onTimeRate >= 80
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {supplier.onTimeRate}%
                      </span>
                      <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-foreground/70"
                          style={{ width: `${supplier.onTimeRate}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Lead Time */}
                  <TableCell className="text-sm text-muted-foreground">
                    {supplier.leadTimeDays}d avg
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-medium ${getStatusColor(supplier.status)}`}
                    >
                      {supplier.status}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit details</DropdownMenuItem>
                        <DropdownMenuItem>Order history</DropdownMenuItem>
                        <DropdownMenuItem>Send message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive font-bold">
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* ── Pagination footer ── */}
        <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPage(1);
              }}
            >
              <SelectTrigger className="h-7 w-14 text-xs border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZES.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>
              {filtered.length === 0
                ? "0 results"
                : `${(page - 1) * pageSize + 1}–${Math.min(
                    page * pageSize,
                    filtered.length
                  )} of ${filtered.length}`}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-border"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === totalPages || Math.abs(p - page) <= 1
              )
              .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1)
                  acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span key={`e-${i}`} className="px-1">
                    …
                  </span>
                ) : (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0 border-border"
                    onClick={() => setPage(p as number)}
                  >
                    {p}
                  </Button>
                )
              )}

            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-border"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
