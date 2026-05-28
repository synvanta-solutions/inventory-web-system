"use client";
import { motion } from "motion/react";
import { Plus, Tag, ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsClient } from "@/hooks/useIsClient";

export function ProductsHero() {
  const isClient = useIsClient();

  return (
    <section className="relative overflow-hidden pt-12 pb-8">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-muted/20 to-muted/10 blur-3xl -z-10" />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <motion.div
          initial={isClient ? { opacity: 0, x: -20 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">
            Product <span className="font-extrabold">Catalog</span>
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Your full product library across{" "}
            <span className="text-foreground font-semibold underline decoration-2 decoration-foreground/20">
              4 categories
            </span>
            . Browse, edit, and manage every item in one place.
          </p>
        </motion.div>

        <motion.div
          initial={isClient ? { opacity: 0, x: 20 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          <Button className="bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 rounded-xl h-11 px-6">
            <Plus className="w-4 h-4 mr-2" />
            New Product
          </Button>
          <Button
            variant="outline"
            className="border-border hover:bg-muted/50 rounded-xl h-11 px-6 group transition-all duration-300"
          >
            <Upload className="w-4 h-4 mr-2 text-foreground/70" />
            Bulk Import
            <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
          </Button>
          <Button
            variant="outline"
            className="border-border hover:bg-muted/50 rounded-xl h-11 px-6"
          >
            <Tag className="w-4 h-4 mr-2 text-foreground/70" />
            Manage Tags
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
