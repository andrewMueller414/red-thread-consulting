import * as z from 'zod';
import type { Prisma } from '../../prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const OnboardingResponseWhereUniqueInputObjectSchema: z.ZodType<Prisma.OnboardingResponseWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseWhereUniqueInput>;
export const OnboardingResponseWhereUniqueInputObjectZodSchema = makeSchema();
