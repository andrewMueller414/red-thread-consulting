import * as z from 'zod';
import type { Prisma } from '../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name_first: z.literal(true).optional(),
  name_last: z.literal(true).optional(),
  ctime: z.literal(true).optional(),
  reviewed_at: z.literal(true).optional()
}).strict();
export const OnboardingResponseMaxAggregateInputObjectSchema: z.ZodType<Prisma.OnboardingResponseMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseMaxAggregateInputType>;
export const OnboardingResponseMaxAggregateInputObjectZodSchema = makeSchema();
