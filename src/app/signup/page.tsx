"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth";
import { Skull, Mail, Lock, User, Briefcase, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function SignupPage() {
  const { register, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Founder");
  const [showPassword, setShowPassword] = useState(false);

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, password: false });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setTouched({ name: true, email: true, password: true });

    if (!name || name.trim().length < 2) {
      setFormError("Name must be at least 2 characters");
      return;
    }
    if (!email) {
      setFormError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setFormError("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 6) {
      setFormError("Password must be at least 6 characters long");
      return;
    }

    setIsSubmitting(true);
    const result = await register(name, email, password, role);
    setIsSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setFormError(result.error || "Registration failed. Please try again.");
    }
  };

  if (isLoading && !isSubmitting) {
    return (
      <div className="min-h-screen bg-[#122336] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Skull className="h-10 w-10 text-primary animate-bounce" />
          <div className="h-1.5 w-24 bg-secondary rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-primary rounded-full animate-infinite-scroll shimmer-bg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#122336] text-[#f8fafc] flex flex-col justify-center items-center relative overflow-hidden px-4 py-10 selection:bg-primary selection:text-white">
      {/* Background Ambience Spheres */}
      <div className="absolute -top-40 right-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-[#ffb703]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-6 text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <Skull className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-extrabold text-xl tracking-widest bg-gradient-to-r from-primary to-[#ffb703] bg-clip-text text-transparent">
            STARTUP GRAVEYARD
          </span>
        </Link>
        <p className="text-xs text-muted-foreground tracking-wider uppercase">
          Create a Failure Intelligence Account
        </p>
      </div>

      {/* Sign Up Card */}
      <div className="w-full max-w-md bg-card/65 backdrop-blur-md border border-border/70 p-8 rounded-2xl shadow-2xl relative z-10 space-y-5">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Get started</h2>
          <p className="text-xs text-muted-foreground">Register an account to evaluate startup risk vectors.</p>
        </div>

        {/* Error Alert Box */}
        {formError && (
          <div className="p-3.5 rounded-lg border border-destructive/20 bg-destructive/10 text-xs text-destructive-foreground flex items-start gap-2.5 animate-shake">
            <AlertCircle className="h-4.5 w-4.5 text-destructive shrink-0 mt-0.5" />
            <div className="font-medium">{formError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Mercer"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (formError) setFormError("");
                }}
                onBlur={() => setTouched({ ...touched, name: true })}
                className={`w-full pl-10.5 pr-4 py-3 bg-[#131d2b]/60 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 placeholder:text-muted-foreground/50 ${
                  touched.name && name.trim().length < 2
                    ? "border-destructive/60 focus:ring-destructive/30"
                    : "border-border/80 focus:border-primary/80 focus:ring-primary/20"
                }`}
              />
            </div>
            {touched.name && name.trim().length < 2 && (
              <span className="text-[10px] text-destructive-foreground font-semibold">Name must be at least 2 characters</span>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@ventures.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formError) setFormError("");
                }}
                onBlur={() => setTouched({ ...touched, email: true })}
                className={`w-full pl-10.5 pr-4 py-3 bg-[#131d2b]/60 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 placeholder:text-muted-foreground/50 ${
                  touched.email && !email
                    ? "border-destructive/60 focus:ring-destructive/30"
                    : touched.email && !validateEmail(email)
                    ? "border-destructive/60 focus:ring-destructive/30"
                    : "border-border/80 focus:border-primary/80 focus:ring-primary/20"
                }`}
              />
            </div>
            {touched.email && !email && (
              <span className="text-[10px] text-destructive-foreground font-semibold">Email is required</span>
            )}
            {touched.email && email && !validateEmail(email) && (
              <span className="text-[10px] text-destructive-foreground font-semibold">Invalid email format</span>
            )}
          </div>

          {/* User Role */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground" htmlFor="role">
              Startup Persona
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10.5 pr-4 py-3 bg-[#131d2b]/60 border border-border/80 focus:border-primary/80 focus:ring-2 focus:ring-primary/20 rounded-xl text-sm transition-all focus:outline-none appearance-none cursor-pointer"
              >
                <option value="Founder" className="bg-[#122336] text-[#f8fafc]">Startup Founder</option>
                <option value="VC Investor" className="bg-[#122336] text-[#f8fafc]">Venture Capitalist</option>
                <option value="Operator" className="bg-[#122336] text-[#f8fafc]">Product Operator</option>
                <option value="Academic" className="bg-[#122336] text-[#f8fafc]">Researcher / Student</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (formError) setFormError("");
                }}
                onBlur={() => setTouched({ ...touched, password: true })}
                className={`w-full pl-10.5 pr-11 py-3 bg-[#131d2b]/60 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 placeholder:text-muted-foreground/50 ${
                  touched.password && password.length < 6
                    ? "border-destructive/60 focus:ring-destructive/30"
                    : "border-border/80 focus:border-primary/80 focus:ring-primary/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
            {touched.password && !password && (
              <span className="text-[10px] text-destructive-foreground font-semibold">Password is required</span>
            )}
            {touched.password && password && password.length < 6 && (
              <span className="text-[10px] text-destructive-foreground font-semibold">Must be at least 6 characters</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-primary/25 disabled:opacity-50 cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <div className="h-4.5 w-4.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                Register Account
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Login redirect link */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-bold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
