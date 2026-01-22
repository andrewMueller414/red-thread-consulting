import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseWhereInputObjectSchema as OnboardingResponseWhereInputObjectSchema } from './objects/OnboardingResponseWhereInput.schema';

export const OnboardingResponseDeleteManySchema: z.ZodType<Prisma.OnboardingResponseDeleteManyArgs> = z.object({ where: OnboardingResponseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseDeleteManyArgs>;

export const OnboardingResponseDeleteManyZodSchema = z.object({ where: OnboardingResponseWhereInputObjectSchema.optional() }).strict();