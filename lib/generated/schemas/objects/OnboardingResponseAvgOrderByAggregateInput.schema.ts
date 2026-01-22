import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const OnboardingResponseAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OnboardingResponseAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseAvgOrderByAggregateInput>;
export const OnboardingResponseAvgOrderByAggregateInputObjectZodSchema = makeSchema();
