"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Trophy,
  Image,
  Briefcase,
  Settings,
  LogOut,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/blogs", label: "Blogs", icon: BookOpen },
  { href: "/resources", label: "Resources", icon: FileText },
  { href: "/results", label: "Results", icon: Trophy },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/careers", label: "Careers", icon: Briefcase },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { admin, logout } = useAuth();

  return (
    <div className="flex h-full w-full flex-col bg-[#1C2025] border-r border-[#2C333C]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#2C333C]">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E6FA8] to-[#2A8FD4] shadow-lg">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#ECEDEE] leading-tight">Shiksha Classes</p>
          <p className="text-[10px] font-medium tracking-widest text-[#B08D57] uppercase leading-tight">Admin Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-[#1E6FA8]/15 text-[#2A8FD4] border-l-2 border-[#B08D57] pl-[10px]"
                    : "text-[#8B919A] hover:bg-[#222830] hover:text-[#ECEDEE]"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isActive ? "text-[#2A8FD4]" : "text-[#555D67] group-hover:text-[#8B919A]"
                  )}
                />
                {item.label}
                {isActive && (
                  <ChevronRight className="ml-auto h-3 w-3 text-[#B08D57] opacity-60" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Admin Info + Logout */}
      <div className="border-t border-[#2C333C] p-3">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 mb-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#B08D57] to-[#C9A46E] text-[#14171B] text-xs font-bold shrink-0">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#ECEDEE] truncate">{admin?.name || "Super Admin"}</p>
            <p className="text-[10px] text-[#555D67] truncate">{admin?.email || "admin@shiksha.in"}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-[#8B919A] hover:text-red-400 hover:bg-red-500/10 text-xs"
          onClick={logout}
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
