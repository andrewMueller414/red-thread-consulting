import * as z from 'zod';
import type { Prisma } from '../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name_first: z.literal(true).optional(),
  name_last: z.literal(true).optional(),
  ctime: z.literal(true).optional(),
  reviewed_at: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const OnboardingResponseCountAggregateInputObjectSchema: z.ZodType<Prisma.OnboardingResponseCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseCountAggregateInputType>;
export const OnboardingResponseCountAggregateInputObjectZodSchema = makeSchema();
