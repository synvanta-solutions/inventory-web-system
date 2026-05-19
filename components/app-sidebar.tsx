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

import { Button } from "@/components/ui/button";
import {

  LayoutDashboard,
  Package,
  Box,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,

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

        {/* User Menu */}
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="w-full" variant="outline" size="lg">
              <LogOut/>
              Logout
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
