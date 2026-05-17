"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
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
  User,
  ChevronsUpDown,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Inventory", icon: Package },
  { name: "Products", icon: Box },
  { name: "Suppliers", icon: Users },
  { name: "Orders", icon: ShoppingCart },
  { name: "Reports", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];

export function AppSidebar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <Sidebar>
      {/* Header — Logo + Workspace Switcher */}
      <SidebarHeader>
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shrink-0">
            <Package className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-heading text-foreground">
            Synvanta
          </span>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Nav Links */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.name}>
                <SidebarMenuButton
                  isActive={activeTab === link.name}
                  onClick={() => setActiveTab(link.name)}
                  tooltip={link.name}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      {/* Footer — Theme Toggle + Notifications + User Menu */}
      <SidebarFooter>
        {/* Theme Toggle & Notifications */}
        <div className="flex items-center justify-center w-full gap-2 px-2 py-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="text-muted-foreground"
            suppressHydrationWarning
          >
            {mounted && resolvedTheme === "dark" ? (
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
        </div>

        {/* User Menu */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 border border-white/20 shrink-0">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop"
                      alt="User"
                    />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left leading-tight overflow-hidden">
                    <span className="text-sm font-medium truncate">
                      Admin User
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      admin@synvanta.io
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto w-4 h-4 shrink-0 text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                side="top"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Admin User
                    </p>
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
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
