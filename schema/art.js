import { z } from "zod";

export const artworkSchema = z.object({
  name: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description is too short"),


});
