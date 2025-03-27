import { z } from "zod"

export const cardSchema = z.object({
  id: z.string(),
  name: z.string(),
  data: z.string(),
  // status: z.enum(["AVAILABLE", "IN USE"]),
})

export const cardFormDataSchema = z.object({
  name: z.string(),
  data: z.string(),
})

export type CardFormData = z.infer<typeof cardFormDataSchema>
export type Card = z.infer<typeof cardSchema>

