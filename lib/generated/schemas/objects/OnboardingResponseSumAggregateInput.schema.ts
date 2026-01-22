import * as z from 'zod';
import type { Prisma } from '../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const OnboardingResponseSumAggregateInputObjectSchema: z.ZodType<Prisma.OnboardingResponseSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseSumAggregateInputType>;
export const OnboardingResponseSumAggregateInputObjectZodSchema = makeSchema();
