"use client";
import { useEffect, useState } from "react";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/user";
import Link from "next/link";
import { signUpUser } from "@/service/auth";
import useFetch from "@/hooks/useFetch";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    reset,
    formState: { errors },

    handleSubmit,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    fn: signingUpUser,
    loading: isSigning,
    data: data,
  } = useFetch(signUpUser);
  const onsubmit = async (data) => {
     signingUpUser(data);
  };
  useEffect(() => {
    if (data?.Success && !isSigning) {
      toast.success("Account Created Successfully");
      reset();
      router.push(`/u/${data.Data.ID}`);
    } else {
      return;
    }
  }, [data, isSigning]);

  return (
    <div className="relative py-20 px-4 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="auth-card w-md bg-overlay/5 backdrop-blur-xl border border-overlay/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <h1 className="animate-item text-3xl md:text-4xl font-serif text-gradient mb-2">
            Join the Society
          </h1>
          <p className="animate-item text-content/60 text-base">
            Start your creative journey today.
          </p>
        </div>

        <form onSubmit={handleSubmit(onsubmit)}>
          {/* Full Name */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-content/80 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-content/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="w-full bg-overlay/5 border border-overlay/10 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-red-800/50 focus:bg-overlay/10 transition-all text-sm text-content placeholder:text-content/20"
                required
              />
              {errors?.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-content/80 ml-1">
              Email Address
            </label>
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
            <label className="text-xs font-medium text-content/80 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-content/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full bg-overlay/5 border border-overlay/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-overlay/10 transition-all text-sm text-content placeholder:text-content/20"
                required
              />
              {errors?.password && <p className="text-red-500">{errors.password.message}</p>}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-content/40 hover:text-content transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="animate-item space-y-1.5">
            <label className="text-xs font-medium text-content/80 ml-1">
              Confirm Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-content/40 group-focus-within:text-red-800 transition-colors" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="w-full bg-overlay/5 border border-overlay/10 rounded-xl py-3 pl-11 pr-11 outline-none focus:border-red-800/50 focus:bg-overlay/10 transition-all text-sm text-content placeholder:text-content/20"
                required
              />
              {errors?.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-content/40 hover:text-content transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSigning}
            className="animate-item w-full bg-red-800 hover:bg-red-950 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 flex-center gap-2 group mt-2 overflow-hidden relative"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm">
              Create Account{" "}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </button>

          {/* Divider */}
          <div className="animate-item flex items-center gap-4 my-2">
            <div className="h-px flex-1 bg-overlay/10" />
            <span className="text-[10px] text-content/30 font-medium uppercase tracking-wider">
              or continue with
            </span>
            <div className="h-px flex-1 bg-overlay/10" />
          </div>

     
        </form>

        <div className="animate-item mt-6 text-center">
          <p className="text-content/40 text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-red-800 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
