import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OnboardingResponseCountOrderByAggregateInputObjectSchema as OnboardingResponseCountOrderByAggregateInputObjectSchema } from './OnboardingResponseCountOrderByAggregateInput.schema';
import { OnboardingResponseAvgOrderByAggregateInputObjectSchema as OnboardingResponseAvgOrderByAggregateInputObjectSchema } from './OnboardingResponseAvgOrderByAggregateInput.schema';
import { OnboardingResponseMaxOrderByAggregateInputObjectSchema as OnboardingResponseMaxOrderByAggregateInputObjectSchema } from './OnboardingResponseMaxOrderByAggregateInput.schema';
import { OnboardingResponseMinOrderByAggregateInputObjectSchema as OnboardingResponseMinOrderByAggregateInputObjectSchema } from './OnboardingResponseMinOrderByAggregateInput.schema';
import { OnboardingResponseSumOrderByAggregateInputObjectSchema as OnboardingResponseSumOrderByAggregateInputObjectSchema } from './OnboardingResponseSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name_first: SortOrderSchema.optional(),
  name_last: SortOrderSchema.optional(),
  how_can_i_help: SortOrderSchema.optional(),
  ctime: SortOrderSchema.optional(),
  reviewed_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => OnboardingResponseCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => OnboardingResponseAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => OnboardingResponseMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => OnboardingResponseMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => OnboardingResponseSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const OnboardingResponseOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.OnboardingResponseOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseOrderByWithAggregationInput>;
export const OnboardingResponseOrderByWithAggregationInputObjectZodSchema = makeSchema();
