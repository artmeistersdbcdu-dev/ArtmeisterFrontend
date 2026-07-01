import { z } from "zod";

export const eventSchema = z.object({
  name: z
    .string()
    .min(3, "Event name must be at least 3 characters")
    .max(100, "Event name is too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description is too long"),

  venue: z
    .string()
    .min(3, "Venue is required"),

  status: z.enum(
    ["online", "offline"],
    {
      message: "Please select a valid status",
    }
  ),

  date: z
    .string()
    .min(1, "Event date is required"),
});