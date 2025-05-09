import { z } from "zod";

export const SetSchema = z.object({
  setCode: z.string(),
  setNumber: z.number(),
  name: z.string(),
  cardCount: z.number(),
});

export const SetDataSchema = z.object({
  sets: z.array(SetSchema),
});
