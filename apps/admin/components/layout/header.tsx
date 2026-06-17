"use client";

import { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";

const pageLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/leads": "Leads",
  "/blogs": "Blogs",
  "/resources": "Resources",
  "/results": "Results",
  "/gallery": "Gallery",
  "/careers": "Careers",
  "/settings": "Settings",
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const pageTitle = Object.entries(pageLabels).find(([key]) =>
    pathname === key || pathname.startsWith(key + "/")
  )?.[1] ?? "Admin";

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-[#2C333C] bg-[#14171B]/95 backdrop-blur px-4 lg:px-6">
        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-[#8B919A] hover:text-[#ECEDEE]"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Page title */}
        <div className="flex-1">
          <h1 className="text-base font-semibold text-[#ECEDEE]">{pageTitle}</h1>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Notification bell */}
          <Button variant="ghost" size="icon" className="relative text-[#8B919A] hover:text-[#ECEDEE]">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
          </Button>

          {/* Admin avatar */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#B08D57] to-[#C9A46E] text-[#14171B] text-xs font-bold cursor-pointer">
            SA
          </div>
        </div>
      </header>

      {/* Mobile sidebar sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0 border-r border-[#2C333C]">
          <Sidebar onClose={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
