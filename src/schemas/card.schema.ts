import { z } from "zod";

export const BaseCardSchema = z.object({
  cardNumber: z.string(),
  setCode: z.string(),
  name: z.string(),
  traits: z.array(z.string()),
  ability: z.array(z.string()),
  faction: z.union([
    z.literal("collective"),
    z.literal("oldAidalon"),
    z.literal("omniworks"),
    z.literal("remnants"),
  ]),
  artist: z.string(),
});

export const CollectionIconsSchema = z.array(
  z.union([z.literal("draw"), z.literal("shard")]),
);

export const SeekerCardSchema = BaseCardSchema.extend({
  unique: z.literal(true),
  title: z.string(),
  collectionIcons: CollectionIconsSchema,
  type: z.literal("seeker"),
  maxCards: z.number(),
  maxShards: z.number(),
  affiliation: z.number(),
});

export const AgentCardSchema = BaseCardSchema.extend({
  unique: z.literal(true),
  title: z.string(),
  cost: z.number(),
  collectionIcons: CollectionIconsSchema,
  type: z.literal("agent"),
  barrier: z.number(),
  cipher: z.string().optional(),
  presence: z.number(),
});

export const ObstacleCardSchema = BaseCardSchema.extend({
  cost: z.number(),
  type: z.literal("obstacle"),
  barrier: z.number(),
  cipher: z.string().optional(),
  presence: z.number(),
  affiliation: z.number(),
});

export const SourceCardSchema = BaseCardSchema.extend({
  unique: z.literal(true).optional(),
  cost: z.number(),
  collectionIcons: CollectionIconsSchema.optional(),
  type: z.literal("source"),
  cipher: z.string().optional(),
  presence: z.number(),
  affiliation: z.number(),
});

export const MomentCardSchema = BaseCardSchema.extend({
  cost: z.number(),
  type: z.literal("moment"),
  affiliation: z.number(),
});

export const CardSchema = z.discriminatedUnion("type", [
  SeekerCardSchema,
  AgentCardSchema,
  ObstacleCardSchema,
  SourceCardSchema,
  MomentCardSchema,
]);
export type Card = z.infer<typeof CardSchema>;

export const CardDataSchema = z.object({
  cards: z.array(CardSchema),
});
export type CardData = z.infer<typeof CardDataSchema>;
