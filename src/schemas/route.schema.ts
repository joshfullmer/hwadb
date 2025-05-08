import { z } from "zod";

export const CardNumberRouteSchema = z
  .string()
  .refine((value) => /[0-9]{3}/.test(value));

export const SetCodeRouteSchema = z.literal("PRCO");
