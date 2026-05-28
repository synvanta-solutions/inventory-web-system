"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Box,
  Users,
  ShoppingCart,
  BarChart3,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Inventory", icon: Package, href: "/inventory" },
  { name: "Products", icon: Box, href: "/products" },
  { name: "Suppliers", icon: Users, href: "/suppliers" },
  { name: "Orders", icon: ShoppingCart, href: "/orders" },
  { name: "Reports", icon: BarChart3, href: "/reports" },
];

export function AppSidebar() {
  const pathname = usePathname();

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
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));

              return (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={link.name}
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      {/* Footer — Theme Toggle + Notifications + User Menu */}
      <SidebarFooter>
        {/* User Menu */}
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="w-full" variant="outline" size="lg">
              <LogOut />
              Logout
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
