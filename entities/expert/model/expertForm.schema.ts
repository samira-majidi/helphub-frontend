import { z } from "zod";

export const expertFormSchema = z.object({
  categoryId: z
    .number({message:  "Category is required" })
    .min(1, "Please select a valid category"),

  bio: z
    .string()
    .max(500, "Bio must not exceed 500 characters")
    .optional()
    .or(z.literal("")),

  location: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),

  imageIds: z.array(z.number()).optional(),
});

export type ExpertFormValues = z.infer<typeof expertFormSchema>;
