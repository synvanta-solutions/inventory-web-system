"use client";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Trash2,
  ChevronLeft,
  ChevronRight,
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
import { inventoryData, Product } from "@/lib/mock-data";
import { useIsClient } from "@/hooks/useIsClient";

// ─── Helpers ──────────────────────────────────────────────────────────────────

type SortField = keyof Pick<
  Product,
  | "name"
  | "sku"
  | "category"
  | "quantity"
  | "supplier"
  | "status"
  | "lastUpdated"
>;
type SortDir = "asc" | "desc";

const CATEGORIES = [
  "All",
  "Mechanical",
  "Electronics",
  "Fasteners",
  "Plumbing",
];
const STATUSES = ["All", "In Stock", "Low Stock", "Out of Stock"];
const PAGE_SIZES = ["5", "10", "20"];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "bg-foreground text-background border-foreground";
    case "Low Stock":
      return "bg-muted text-foreground border-border";
    case "Out of Stock":
      return "bg-transparent text-muted-foreground border-dashed border-muted-foreground";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

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

export function FullInventoryTable() {
  const isClient = useIsClient();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let data = inventoryData.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.supplier.toLowerCase().includes(q);
      const matchCat = category === "All" || p.category === category;
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
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
  }, [search, category, statusFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allPageSelected =
    paginated.length > 0 && paginated.every((p) => selected.has(p.id));

  function toggleSort(field: SortField) {
    if (field === sortField) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  function toggleAll() {
    const ids = paginated.map((p) => p.id);
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
    setCategory("All");
    setStatusFilter("All");
    setPage(1);
  }

  const hasFilters = search || category !== "All" || statusFilter !== "All";

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
          <h2 className="text-xl font-bold">All Products</h2>
          <p className="text-sm text-muted-foreground">
            Full catalog with search, sort, and filters
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products, SKU, supplier…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 bg-background/50"
            />
          </div>

          {/* Category */}
          <Select
            value={category}
            onValueChange={(v) => {
              setCategory(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36 border-border bg-background/50">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status */}
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-36 border-border bg-background/50">
              <SelectValue />
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
              size="icon"
              className="shrink-0 border-border text-muted-foreground"
              onClick={resetFilters}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}

          {/* Bulk delete */}
          {selected.size > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="border-destructive/40 text-destructive hover:bg-destructive/10 gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete ({selected.size})
            </Button>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="rounded-2xl border border-border glass overflow-hidden shadow-sm">
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
              <SortableTH field="name" label="Product" className="w-64" />
              <SortableTH field="sku" label="SKU" />
              <SortableTH field="category" label="Category" />
              <SortableTH
                field="quantity"
                label="Quantity"
                className="text-center"
              />
              <SortableTH field="supplier" label="Supplier" />
              <SortableTH field="status" label="Status" />
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-16 text-center text-muted-foreground"
                >
                  <p className="font-medium">No products match your filters.</p>
                  <p className="text-xs mt-1">
                    Try adjusting your search or filter criteria.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((product) => (
                <TableRow
                  key={product.id}
                  className={`hover:bg-muted/30 transition-colors group border-b border-border/50 ${
                    selected.has(product.id) ? "bg-muted/20" : ""
                  }`}
                >
                  {/* Checkbox */}
                  <TableCell className="px-4">
                    <input
                      type="checkbox"
                      checked={selected.has(product.id)}
                      onChange={() => toggleRow(product.id)}
                      className="rounded border-border cursor-pointer accent-primary"
                    />
                  </TableCell>

                  {/* Product */}
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover grayscale"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {product.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                          Updated {product.lastUpdated}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* SKU */}
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {product.sku}
                  </TableCell>

                  {/* Category */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="font-normal border-border bg-muted/30"
                    >
                      {product.category}
                    </Badge>
                  </TableCell>

                  {/* Quantity */}
                  <TableCell className="text-center">
                    <span
                      className={`font-semibold tabular-nums text-sm ${
                        product.quantity === 0
                          ? "text-muted-foreground line-through"
                          : product.quantity < 15
                            ? "text-foreground"
                            : "text-foreground"
                      }`}
                    >
                      {product.quantity === 0
                        ? "—"
                        : product.quantity.toLocaleString()}
                    </span>
                  </TableCell>

                  {/* Supplier */}
                  <TableCell className="text-sm text-muted-foreground">
                    {product.supplier}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-medium ${getStatusColor(product.status)}`}
                    >
                      {product.status}
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
                        <DropdownMenuItem>Edit details</DropdownMenuItem>
                        <DropdownMenuItem>View history</DropdownMenuItem>
                        <DropdownMenuItem>Order restock</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive font-bold">
                          Delete
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
                : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filtered.length)} of ${filtered.length}`}
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
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
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
                ),
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
