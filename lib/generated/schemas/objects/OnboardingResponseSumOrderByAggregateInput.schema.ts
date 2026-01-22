import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const OnboardingResponseSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OnboardingResponseSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseSumOrderByAggregateInput>;
export const OnboardingResponseSumOrderByAggregateInputObjectZodSchema = makeSchema();
