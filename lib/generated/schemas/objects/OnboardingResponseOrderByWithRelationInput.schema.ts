import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name_first: SortOrderSchema.optional(),
  name_last: SortOrderSchema.optional(),
  ctime: SortOrderSchema.optional(),
  reviewed_at: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional()
}).strict();
export const OnboardingResponseOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OnboardingResponseOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseOrderByWithRelationInput>;
export const OnboardingResponseOrderByWithRelationInputObjectZodSchema = makeSchema();
