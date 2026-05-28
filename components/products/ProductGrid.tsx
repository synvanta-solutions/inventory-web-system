"use client";
import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  RefreshCw,
  LayoutGrid,
  List,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Copy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { inventoryData, Product } from "@/lib/mock-data";
import { useIsClient } from "@/hooks/useIsClient";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "All",
  "Mechanical",
  "Electronics",
  "Fasteners",
  "Plumbing",
];

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

// ─── Card view ────────────────────────────────────────────────────────────────

function ProductCard({
  product,
  index,
  isClient,
}: {
  product: Product;
  index: number;
  isClient: boolean;
}) {
  return (
    <motion.div
      initial={isClient ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 * index }}
      className="group glass rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-muted h-44">
        <img
          src={product.gridImage}
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-lg shadow-md"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <Eye className="w-3.5 h-3.5 mr-2" /> View details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-3.5 h-3.5 mr-2" /> Edit product
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="w-3.5 h-3.5 mr-2" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive font-bold">
                <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Status badge on image */}
        <div className="absolute bottom-3 left-3">
          <Badge
            variant="outline"
            className={`text-[10px] font-semibold backdrop-blur-sm ${getStatusColor(product.status)}`}
          >
            {product.status}
          </Badge>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <Badge
            variant="outline"
            className="font-normal border-border bg-muted/30 text-[10px] shrink-0"
          >
            {product.category}
          </Badge>
        </div>

        <p className="text-[11px] font-mono text-muted-foreground mb-3">
          {product.sku}
        </p>

        <div className="flex items-center justify-between border-t border-border/50 pt-3">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              Supplier
            </p>
            <p className="text-xs font-semibold mt-0.5 truncate max-w-[110px]">
              {product.supplier}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              Qty
            </p>
            <p
              className={`text-sm font-bold tabular-nums mt-0.5 ${
                product.quantity === 0
                  ? "text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {product.quantity === 0 ? "—" : product.quantity.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── List row ─────────────────────────────────────────────────────────────────

function ProductRow({ product }: { product: Product }) {
  return (
    <TableRow className="hover:bg-muted/30 transition-colors group border-b border-border/50">
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
      <TableCell className="font-mono text-xs text-muted-foreground">
        {product.sku}
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className="font-normal border-border bg-muted/30"
        >
          {product.category}
        </Badge>
      </TableCell>
      <TableCell className="text-center font-semibold tabular-nums">
        {product.quantity === 0 ? (
          <span className="text-muted-foreground">—</span>
        ) : (
          product.quantity.toLocaleString()
        )}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {product.supplier}
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`font-medium ${getStatusColor(product.status)}`}
        >
          {product.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>
              <Eye className="w-3.5 h-3.5 mr-2" /> View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="w-3.5 h-3.5 mr-2" /> Edit product
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="w-3.5 h-3.5 mr-2" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive font-bold">
              <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProductGrid() {
  const isClient = useIsClient();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return inventoryData.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.supplier.toLowerCase().includes(q);
      const matchCat = category === "All" || p.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  const hasFilters = search || category !== "All";

  if (!isClient) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="py-8"
    >
      {/* ── Toolbar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">All Products</h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search name, SKU, supplier…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background/50"
            />
          </div>

          {/* Category filter */}
          <Select value={category} onValueChange={(v) => setCategory(v)}>
            <SelectTrigger className="w-40 border-border bg-background/50">
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

          {/* Reset */}
          {hasFilters && (
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}

          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-2 transition-colors ${
                view === "grid"
                  ? "bg-foreground text-background"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 transition-colors ${
                view === "list"
                  ? "bg-foreground text-background"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Grid view ── */}
      {view === "grid" && (
        <>
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl border border-border py-20 text-center text-muted-foreground">
              <p className="font-medium">No products match your filters.</p>
              <p className="text-xs mt-1">
                Try adjusting your search or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  isClient={isClient}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── List view ── */}
      {view === "list" && (
        <div className="rounded-2xl border border-border glass overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-64">Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-16 text-center text-muted-foreground"
                  >
                    <p className="font-medium">
                      No products match your filters.
                    </p>
                    <p className="text-xs mt-1">
                      Try adjusting your search or category.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );
}
