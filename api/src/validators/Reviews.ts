import { z } from "zod"

export const ReviewSchema = z.object({
  id_user: z.number().positive(),
  id_product: z.number().positive(),
  review: z.string().min(5, "The min characters is 5"),
  rate: z.number().min(0, "The min rate is 0").max(5, "The max rate is 5"),
  /*   date: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg)
    return
  }, z.date()), */
})
