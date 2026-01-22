import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseCreateManyInputObjectSchema as OnboardingResponseCreateManyInputObjectSchema } from './objects/OnboardingResponseCreateManyInput.schema';

export const OnboardingResponseCreateManySchema: z.ZodType<Prisma.OnboardingResponseCreateManyArgs> = z.object({ data: z.union([ OnboardingResponseCreateManyInputObjectSchema, z.array(OnboardingResponseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseCreateManyArgs>;

export const OnboardingResponseCreateManyZodSchema = z.object({ data: z.union([ OnboardingResponseCreateManyInputObjectSchema, z.array(OnboardingResponseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();