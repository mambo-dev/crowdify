import { z } from "zod";

export const basicInformationSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  deadline: z.coerce
    .date()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "a valid date is required",
    })
    .transform((date) => new Date(date)),
});
