"use client";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  RefreshCw,
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
import { inventoryData } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsClient } from "@/hooks/useIsClient";

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "bg-foreground text-background border-foreground";
    case "Low Stock":
      return "bg-muted text-foreground border-border";
    case "Out of Stock":
      return "bg-transparent text-muted-foreground border-dashed border-muted-foreground";
    default:
      return "bg-slate-500/10 text-slate-500";
  }
};

export function InventoryTable() {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="py-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">Inventory Levels</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track your full product catalog
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Filter products..."
              className="pl-9 bg-background/50"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 border-border"
          >
            <Filter className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 border-border"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border glass overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-75">Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryData.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-muted/30 transition-colors group border-b border-border/50"
              >
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
                <TableCell className="font-mono text-xs">
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
                <TableCell className="text-center font-semibold">
                  {product.quantity}
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
                      <DropdownMenuItem>Edit details</DropdownMenuItem>
                      <DropdownMenuItem>View history</DropdownMenuItem>
                      <DropdownMenuItem>Order restock</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive font-bold">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <p>Showing 5 of 124 products</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-border"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 transition-colors hover:bg-primary hover:text-primary-foreground border-border"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
