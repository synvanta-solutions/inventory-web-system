"use client";
import { motion } from "motion/react";
import {
  Search,
  Bell,
  Moon,
  Sun,
  LayoutDashboard,
  Package,
  Box,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Menu,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useIsClient } from "@/hooks/useIsClient";

const navLinks = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Inventory", icon: Package },
  { name: "Products", icon: Box },
  { name: "Suppliers", icon: Users },
  { name: "Orders", icon: ShoppingCart },
  { name: "Reports", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const isClient = useIsClient();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme ?? theme;

  return (
    <nav className="sticky top-0 z-50 w-full glass">
      <div className="absolute bottom-0 left-0 h-0.5 w-full gradient-bg opacity-50" />
      <div className="max-w-450 mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 pr-4">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg">
            <Package className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-heading text-foreground">
            Synvanta
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              onClick={() => setActiveTab(link.name)}
              className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                activeTab === link.name
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <link.icon className="w-4 h-4 mr-2" />
              {link.name}
              {activeTab === link.name && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute -bottom-4.5 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            className="pl-9 bg-background/50 border-white/20 focus-visible:ring-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="text-muted-foreground"
          >
            {isClient && currentTheme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full ml-2"
              >
                <Avatar className="h-8 w-8 border border-white/20">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop"
                    alt="User"
                  />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@synvanta.io
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-primary font-medium">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-muted-foreground"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
