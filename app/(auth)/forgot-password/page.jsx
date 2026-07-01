"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { forgotPasswordSchema } from "@/schema/user";
import { forgotPassword } from "@/service/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import { toast } from "sonner";
import { sendResetEmail } from "@/service/reset-email";

const ForgotPasswordPage = () => {
  const [successLink, setSuccessLink] = useState(null);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    fn: requestPasswordReset,
    loading: isSubmitting,
    data: data,
  } = useFetch(forgotPassword);
  const {
    fn: sendEmail,
    loading: sending,
    data: sent,
  } = useFetch(sendResetEmail);

  const onsubmit = (formData) => {
    requestPasswordReset(formData);
  };

  useEffect(() => {
    if (data?.Success && !isSubmitting) {
      toast.success("Reset link generated successfully");
      const email = data.Data?.email;
      reset();
      if (data.Data?.resetLink) {
        setSuccessLink(data.Data.resetLink);
        const payload = {
          to: email,
          resetURL: data.Data?.resetLink,
        };
        console.log(payload);
        sendEmail(payload);
      }
    }
  }, [data, isSubmitting]);
  useEffect(() => {
    if (sent?.Success && !sending) {
      toast.success("Reset link sent successfully");
    }
  }, [sent, sending]);

  return (
    <div className="relative py-20 px-4 overflow-hidden w-full">
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="auth-card w-md bg-overlay/5 backdrop-blur-xl border border-overlay/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 mx-auto">
        <div className="text-center mb-6">
          <h1 className="animate-item text-3xl md:text-4xl font-serif text-gradient mb-2">
            Forgot Password
          </h1>
          <p className="animate-item text-content/60 text-base">
            No worries, we will help you reset it.
          </p>
        </div>

        {!data?.Success ? (
          <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
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
                {errors?.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="animate-item w-full bg-red-800 hover:bg-red-700 text-content font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 flex-center gap-2 group mt-2 overflow-hidden relative disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm">
                Send Instructions{" "}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="p-4 bg-red-950/20 border border-red-800/30 rounded-2xl text-content/80 text-sm leading-relaxed">
              If an account with that email exists, The reset Link has been sent to you. Check your spam folder as well.
            </div>
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 text-content/40 text-sm hover:text-content transition-colors"
            >
              Request another reset link
            </button>
          </div>
        )}

        <div className="animate-item mt-6 text-center border-t border-overlay/5 pt-4">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 text-content/40 text-sm hover:text-content transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
