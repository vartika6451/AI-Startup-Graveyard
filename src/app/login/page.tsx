"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth";
import { Skull, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

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
    setTouched({ email: true, password: true });

    if (!email) {
      setFormError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setFormError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setFormError("Password is required");
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setFormError(result.error || "Login failed. Please try again.");
    }
  };

  const handleDemoLogin = async () => {
    setEmail("admin@graveyard.com");
    setPassword("admin123");
    setFormError("");
    setTouched({ email: true, password: true });

    setIsSubmitting(true);
    const result = await login("admin@graveyard.com", "admin123");
    setIsSubmitting(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setFormError(result.error || "Demo login failed");
    }
  };

  // If loading session, show absolute centering spinner
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
    <div className="min-h-screen bg-[#122336] text-[#f8fafc] flex flex-col justify-center items-center relative overflow-hidden px-4 selection:bg-primary selection:text-white">
      {/* Background Ambience Spheres */}
      <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-[#ffb703]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-8 text-center z-10 animate-fade-in">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
          <Skull className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-extrabold text-xl tracking-widest bg-gradient-to-r from-primary to-[#ffb703] bg-clip-text text-transparent">
            STARTUP GRAVEYARD
          </span>
        </Link>
        <p className="text-xs text-muted-foreground tracking-wider uppercase">
          Failure Intelligence Console Access
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-card/65 backdrop-blur-md border border-border/70 p-8 rounded-2xl shadow-2xl relative z-10 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Welcome back</h2>
          <p className="text-xs text-muted-foreground">Sign in to evaluate concepts against historical postmortems.</p>
        </div>

        {/* Error Alert Box */}
        {formError && (
          <div className="p-3.5 rounded-lg border border-destructive/20 bg-destructive/10 text-xs text-destructive-foreground flex items-start gap-2.5 animate-shake">
            <AlertCircle className="h-4.5 w-4.5 text-destructive shrink-0 mt-0.5" />
            <div className="font-medium">{formError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
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
                placeholder="you@example.com"
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

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground" htmlFor="password">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (formError) setFormError("");
                }}
                onBlur={() => setTouched({ ...touched, password: true })}
                className={`w-full pl-10.5 pr-11 py-3 bg-[#131d2b]/60 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 placeholder:text-muted-foreground/50 ${
                  touched.password && !password
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
                Sign In
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative flex py-2 items-center text-xs">
          <div className="flex-grow border-t border-border/40"></div>
          <span className="flex-shrink mx-4 text-muted-foreground/50 font-semibold uppercase tracking-widest text-[9px]">
            Demo Sandbox
          </span>
          <div className="flex-grow border-t border-border/40"></div>
        </div>

        {/* Demo Fast Login Shortcut */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={isSubmitting}
          className="w-full py-3 border border-primary/25 bg-primary/5 hover:bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="h-4 w-4 text-primary shrink-0" />
          Quick Demo Login
        </button>

        {/* Signup Redirect link */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-bold">
              Sign Up for Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
