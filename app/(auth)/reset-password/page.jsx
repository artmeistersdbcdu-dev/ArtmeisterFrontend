"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { resetPasswordSchema } from "@/schema/user";
import { resetPassword } from "@/service/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    fn: resetUserPassword,
    loading: isSubmitting,
    data: data,
  } = useFetch(resetPassword);

  const onsubmit = async (formData) => {
    if (!token) {
      toast.error("Reset token is missing");
      return;
    }
    await resetUserPassword({
      token,
      password: formData.password,
    });
  };

  useEffect(() => {
    if (data?.Success && !isSubmitting) {
      toast.success("Password reset successfully. Redirecting to Sign In...");
      reset();
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    }
  }, [data, isSubmitting, router]);

  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <div className="flex-center col-center gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800/30 rounded-2xl text-content/80">
          <AlertTriangle className="size-8 text-yellow" />
          <h2 className="font-serif text-lg text-content">Invalid Reset Link</h2>
          <p className="text-xs text-content/60">
            The password reset link is invalid, incomplete, or has expired. Please request a new one.
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-block text-xs font-semibold text-red-800 hover:underline mt-2"
        >
          Request new reset link
        </Link>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
      {/* Password */}
      <div className="animate-item space-y-1.5">
        <label className="text-xs font-medium text-content/80 ml-1">New Password</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-content/40 group-focus-within:text-red-800 transition-colors" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            className="w-full bg-overlay/5 border border-overlay/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-overlay/10 transition-all text-sm text-content placeholder:text-content/20"
            required
          />
          {errors?.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-content/40 hover:text-content transition-colors"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="animate-item space-y-1.5">
        <label className="text-xs font-medium text-content/80 ml-1">Confirm Password</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-content/40 group-focus-within:text-red-800 transition-colors" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="w-full bg-overlay/5 border border-overlay/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-overlay/10 transition-all text-sm text-content placeholder:text-content/20"
            required
          />
          {errors?.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-content/40 hover:text-content transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="animate-item w-full bg-red-800 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 flex-center gap-2 group mt-2 overflow-hidden relative disabled:opacity-50"
      >
        <span className="relative z-10 flex items-center gap-2 text-sm">
          Reset Password{" "}
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
      </button>
    </form>
  );
};

const ResetPasswordPage = () => {
  return (
    <div className="relative py-20 px-4 overflow-hidden w-full">
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="auth-card w-md bg-overlay/5 backdrop-blur-xl border border-overlay/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 mx-auto">
        <div className="text-center mb-6">
          <h1 className="animate-item text-3xl md:text-4xl font-serif text-gradient mb-2">
            Reset Password
          </h1>
          <p className="animate-item text-content/60 text-base">
            Choose a strong new password.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-4 text-content/60 text-sm">
              Loading reset interface...
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>

        <div className="animate-item mt-6 text-center border-t border-overlay/5 pt-4">
          <Link
            href="/sign-in"
            className="text-content/40 text-sm hover:text-content transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
