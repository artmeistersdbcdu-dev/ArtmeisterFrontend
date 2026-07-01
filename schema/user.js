

import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),

    email: z.string().email("Invalid email address"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password.trim() === data.confirmPassword.trim(), {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export const onBoardingSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),
  description: z
    .string()
    .max(2000, "Bio cannot exceed 2000 characters")
    .optional(),
  batch: z.string().max(20, "Batch cannot exceed 20 characters").optional(),
  instagram: z
    .string()
    .url("Enter a valid Instagram URL")
    .optional()
    .or(z.literal("")),
  youtube: z
    .string()
    .url("Enter a valid YouTube URL")
    .optional()
    .or(z.literal("")),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
