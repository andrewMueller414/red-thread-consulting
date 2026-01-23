import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { PriorityIdSchema } from '../enums/PriorityId.schema'

const makeSchema = () => z.object({
  equals: PriorityIdSchema.array().optional().nullable(),
  has: PriorityIdSchema.optional().nullable(),
  hasEvery: PriorityIdSchema.array().optional(),
  hasSome: PriorityIdSchema.array().optional(),
  isEmpty: z.boolean().optional()
}).strict();
export const EnumPriorityIdNullableListFilterObjectSchema: z.ZodType<Prisma.EnumPriorityIdNullableListFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPriorityIdNullableListFilter>;
export const EnumPriorityIdNullableListFilterObjectZodSchema = makeSchema();
