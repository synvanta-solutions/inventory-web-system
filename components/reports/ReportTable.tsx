"use client";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Search,
  Download,
  RefreshCw,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileSpreadsheet,
  File,
  CheckCircle2,
  Loader2,
  Clock,
  XCircle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  User,
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
import { reportsData, Report, ReportType, ReportStatus } from "@/lib/mock-data";
import { useIsClient } from "@/hooks/useIsClient";

// ─── Config ───────────────────────────────────────────────────────────────────

type SortField = keyof Pick<
  Report,
  "name" | "type" | "lastRun" | "status" | "format"
>;
type SortDir = "asc" | "desc";

const TYPES: (ReportType | "All")[] = [
  "All",
  "Inventory",
  "Supplier",
  "Orders",
  "Financial",
  "Activity",
];
const STATUSES: (ReportStatus | "All")[] = [
  "All",
  "Ready",
  "Generating",
  "Scheduled",
  "Failed",
];
const PAGE_SIZES = ["5", "10", "20"];

const STATUS_CONFIG: Record<
  ReportStatus,
  { icon: React.ElementType; className: string; label: string }
> = {
  Ready: {
    icon: CheckCircle2,
    className: "bg-foreground text-background border-foreground",
    label: "Ready",
  },
  Generating: {
    icon: Loader2,
    className: "bg-muted text-foreground border-border",
    label: "Generating",
  },
  Scheduled: {
    icon: Clock,
    className: "bg-muted text-muted-foreground border-border",
    label: "Scheduled",
  },
  Failed: {
    icon: XCircle,
    className:
      "bg-transparent text-muted-foreground border-dashed border-muted-foreground",
    label: "Failed",
  },
};

const FORMAT_ICONS: Record<string, React.ElementType> = {
  PDF: FileText,
  CSV: File,
  XLSX: FileSpreadsheet,
};

const TYPE_COLORS: Record<ReportType, string> = {
  Inventory: "bg-muted/60 text-foreground border-border",
  Supplier: "bg-muted/60 text-foreground border-border",
  Orders: "bg-muted/60 text-foreground border-border",
  Financial: "bg-foreground/10 text-foreground border-foreground/20",
  Activity: "bg-muted/60 text-muted-foreground border-border",
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

export function ReportTable() {
  const isClient = useIsClient();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ReportType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "All">("All");
  const [sortField, setSortField] = useState<SortField>("lastRun");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let data = reportsData.filter((r) => {
      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.createdBy.toLowerCase().includes(q);
      const matchType = typeFilter === "All" || r.type === typeFilter;
      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });

    return [...data].sort((a, b) => {
      const av = a[sortField] ?? "";
      const bv = b[sortField] ?? "";
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [search, typeFilter, statusFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allPageSelected =
    paginated.length > 0 && paginated.every((r) => selected.has(r.id));

  function toggleSort(field: SortField) {
    if (field === sortField) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  function toggleAll() {
    const ids = paginated.map((r) => r.id);
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
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">All Reports</h2>
          <p className="text-sm text-muted-foreground">
            Search, filter, and manage your report library
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search reports…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 h-9 text-sm bg-muted/40 border-border rounded-xl"
            />
          </div>

          {/* Type filter */}
          <Select
            value={typeFilter}
            onValueChange={(v) => {
              setTypeFilter(v as ReportType | "All");
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-36 text-xs border-border rounded-xl">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t === "All" ? "All Types" : t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status filter */}
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v as ReportStatus | "All");
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-36 text-xs border-border rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "All" ? "All Statuses" : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/20 hover:bg-muted/20">
              <TableHead className="px-4 w-10">
                <input
                  type="checkbox"
                  checked={allPageSelected}
                  onChange={toggleAll}
                  className="rounded border-border cursor-pointer accent-primary"
                />
              </TableHead>
              <SortableTH
                field="name"
                label="Report"
                className="min-w-[240px]"
              />
              <SortableTH field="type" label="Type" />
              <SortableTH field="format" label="Format" />
              <SortableTH field="lastRun" label="Last Run" />
              <TableHead>Created By</TableHead>
              <TableHead>Next Run</TableHead>
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
                  <p className="font-medium">No reports match your filters.</p>
                  <p className="text-xs mt-1">
                    Try adjusting your search or filter criteria.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((report) => {
                const statusCfg = STATUS_CONFIG[report.status];
                const StatusIcon = statusCfg.icon;
                const FormatIcon = FORMAT_ICONS[report.format] ?? FileText;
                const typeCls = TYPE_COLORS[report.type];

                return (
                  <TableRow
                    key={report.id}
                    className={`hover:bg-muted/30 transition-colors group border-b border-border/50 ${
                      selected.has(report.id) ? "bg-muted/20" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <TableCell className="px-4">
                      <input
                        type="checkbox"
                        checked={selected.has(report.id)}
                        onChange={() => toggleRow(report.id)}
                        className="rounded border-border cursor-pointer accent-primary"
                      />
                    </TableCell>

                    {/* Report name + description */}
                    <TableCell className="font-medium">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0">
                          <FormatIcon className="w-4 h-4 text-foreground/60" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                            {report.name}
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5 truncate max-w-[220px]">
                            {report.description}
                          </div>
                          {report.rowCount && (
                            <div className="text-[10px] text-muted-foreground/60 mt-0.5">
                              {report.rowCount.toLocaleString()} rows
                              {report.fileSize ? ` · ${report.fileSize}` : ""}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-medium ${typeCls}`}
                      >
                        {report.type}
                      </Badge>
                    </TableCell>

                    {/* Format */}
                    <TableCell>
                      <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                        {report.format}
                      </span>
                    </TableCell>

                    {/* Last run */}
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 shrink-0" />
                        {new Date(report.lastRun).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </TableCell>

                    {/* Created by */}
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="w-3 h-3 shrink-0" />
                        {report.createdBy}
                      </div>
                    </TableCell>

                    {/* Next run */}
                    <TableCell>
                      {report.nextRun ? (
                        <div className="text-xs text-muted-foreground tabular-nums">
                          {new Date(report.nextRun).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground/40">
                          —
                        </span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`font-medium flex items-center gap-1 w-fit ${statusCfg.className}`}
                      >
                        <StatusIcon
                          className={`w-3 h-3 ${
                            report.status === "Generating" ? "animate-spin" : ""
                          }`}
                        />
                        {statusCfg.label}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {report.status === "Ready" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>View report</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="w-3.5 h-3.5 mr-2" />
                              Regenerate
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit schedule</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive font-bold">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination footer */}
        <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {selected.size > 0 && (
              <span className="text-foreground font-semibold">
                {selected.size} selected ·
              </span>
            )}
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
                    filtered.length,
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
