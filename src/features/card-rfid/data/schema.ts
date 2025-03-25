import { z } from "zod"

export const cardRfidSchema = z.object({
  id: z.string(),
  cardData: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
})

export type CardRfid = z.infer<typeof cardRfidSchema>

