import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name_first: SortOrderSchema.optional(),
  name_last: SortOrderSchema.optional(),
  ctime: SortOrderSchema.optional(),
  reviewed_at: SortOrderSchema.optional()
}).strict();
export const OnboardingResponseMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OnboardingResponseMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseMaxOrderByAggregateInput>;
export const OnboardingResponseMaxOrderByAggregateInputObjectZodSchema = makeSchema();
