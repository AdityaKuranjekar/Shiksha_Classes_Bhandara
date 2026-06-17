"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }
    setLoading(true);
    
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    
    const result = await login(formData);
    if (result.success) {
      toast.success("Welcome back, Admin!");
      router.push("/dashboard");
    } else {
      toast.error(result.error || "Login failed.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#14171B]">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-[#1C2025] via-[#14171B] to-[#0E1115] border-r border-[#2C333C] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#1E6FA8]/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#B08D57]/5 blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E6FA8] to-[#2A8FD4] shadow-lg">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-[#ECEDEE]">Shiksha Classes</p>
            <p className="text-xs text-[#B08D57] tracking-widest uppercase">Bhandara</p>
          </div>
        </div>

        {/* Center content */}
        <div className="relative space-y-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#B08D57] uppercase mb-3">Admin Portal</p>
            <h2 className="font-serif text-4xl font-light text-[#ECEDEE] leading-tight">
              Manage your institute{" "}
              <span className="italic text-[#2A8FD4]">efficiently.</span>
            </h2>
          </div>
          <p className="text-[#8B919A] text-sm leading-relaxed max-w-xs">
            Your command centre for leads, content, results, and careers. Everything your coaching institute needs, in one place.
          </p>

          {/* Feature highlights */}
          <div className="space-y-3">
            {[
              "Real-time lead & enquiry management",
              "Blog, resources, and results CMS",
              "Gallery and careers management",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-[#B08D57]" />
                <p className="text-xs text-[#8B919A]">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative">
          <p className="text-xs text-[#555D67]">© 2026 Shiksha Classes, Bhandara. All rights reserved.</p>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-8">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-3 mb-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E6FA8] to-[#2A8FD4]">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-[#ECEDEE]">Shiksha Classes</p>
            <p className="text-xs text-[#B08D57] tracking-widest uppercase">Admin Portal</p>
          </div>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#ECEDEE] mb-1">Welcome back</h1>
            <p className="text-sm text-[#8B919A]">Sign in to your admin account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555D67]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@shiksha.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555D67]" />
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555D67] hover:text-[#8B919A] transition-colors"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1E6FA8] hover:bg-[#2A8FD4] text-white font-medium mt-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 rounded-lg border border-[#2C333C] bg-[#1C2025] p-3">
            <p className="text-xs text-[#555D67] font-medium mb-1">Demo credentials</p>
            <p className="text-xs text-[#8B919A]">Email: <span className="text-[#2A8FD4]">admin@shiksha.in</span></p>
            <p className="text-xs text-[#8B919A]">Password: <span className="text-[#2A8FD4]">admin123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
