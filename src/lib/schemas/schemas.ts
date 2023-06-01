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

export const rewardSchema = z.object({
  rewardTitle: z.string().min(1, "title is required"),
  rewardDescription: z.string().min(1, "description is required"),
  rewardAmountRequirement: z.coerce
    .string()
    .min(1, "amount  is required")
    .transform((amount) => Number(amount)),
  rewardStock: z.coerce
    .string()
    .min(1, "stock is required")
    .transform((amount) => Number(amount)),
  rewardType: z.enum(["merchandise", "early_access", "perks"]),
});
