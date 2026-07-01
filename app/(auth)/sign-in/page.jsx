"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye,
  EyeOff,
} from "lucide-react";
import { loginSchema } from "@/schema/user";
import { loginUser } from "@/service/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const router=useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    fn: signingUpUser,
    loading: isSigning,
    data: data,
  } = useFetch(loginUser);
  const onsubmit = async (data) => {
    await signingUpUser(data);
  };
  useEffect(() => {
    if (data?.Success && !isSigning) {
      toast.success("Signed in Successfully");
      reset();
      router.push(`/u/${data.Data.id}`);
    } else {
      return;
    }
  }, [data, isSigning]);
  return (
    <div className="relative py-20 px-4 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="auth-card w-md bg-overlay/5 backdrop-blur-xl border border-overlay/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 mx-auto">
        <div className="text-center mb-6">
          <h1 className="animate-item text-3xl md:text-4xl font-serif text-gradient mb-2">
            Welcome Back
          </h1>
          <p className="animate-item text-content/60 text-base">
            Continue your creative journey.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
          {/* Email */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-content/80 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-content/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type="email"
                placeholder="john@example.com"
 {...register("email")}
                className="w-full bg-overlay/5 border border-overlay/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-800/50 focus:bg-overlay/10 transition-all text-sm text-content placeholder:text-content/20"
                required
              />
              {errors?.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          {/* Password */}
          <div className="animate-item space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-medium text-content/80">Password</label>
              <Link href="/forgot-password" size="sm" className="text-[10px] text-red-800 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-content/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-overlay/5 border border-overlay/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-overlay/10 transition-all text-sm text-content placeholder:text-content/20"
                required
                 {...register("password")}
              />
              {errors?.password && <p className="text-red-500">{errors.password.message}</p>}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-content/40 hover:text-content transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="animate-item w-full bg-red-800 hover:bg-red-700 text-content font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 flex-center gap-2 group mt-2 overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm">
              Sign In <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </button>

          {/* Divider */}
          <div className="animate-item flex items-center gap-4 my-2">
            <div className="h-px flex-1 bg-overlay/10" />
            <span className="text-[10px] text-content/30 font-medium uppercase tracking-wider">or continue with</span>
            <div className="h-px flex-1 bg-overlay/10" />
          </div>

   
        </form>

        <div className="animate-item mt-6 text-center">
          <p className="text-content/40 text-sm">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-red-800 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
