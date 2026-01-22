import * as z from 'zod';
import type { Prisma } from '../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name_first: z.literal(true).optional(),
  name_last: z.literal(true).optional(),
  ctime: z.literal(true).optional(),
  reviewed_at: z.literal(true).optional()
}).strict();
export const OnboardingResponseMinAggregateInputObjectSchema: z.ZodType<Prisma.OnboardingResponseMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseMinAggregateInputType>;
export const OnboardingResponseMinAggregateInputObjectZodSchema = makeSchema();
