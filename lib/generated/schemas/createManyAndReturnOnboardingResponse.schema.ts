import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseSelectObjectSchema as OnboardingResponseSelectObjectSchema } from './objects/OnboardingResponseSelect.schema';
import { OnboardingResponseCreateManyInputObjectSchema as OnboardingResponseCreateManyInputObjectSchema } from './objects/OnboardingResponseCreateManyInput.schema';

export const OnboardingResponseCreateManyAndReturnSchema: z.ZodType<Prisma.OnboardingResponseCreateManyAndReturnArgs> = z.object({ select: OnboardingResponseSelectObjectSchema.optional(), data: z.union([ OnboardingResponseCreateManyInputObjectSchema, z.array(OnboardingResponseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseCreateManyAndReturnArgs>;

export const OnboardingResponseCreateManyAndReturnZodSchema = z.object({ select: OnboardingResponseSelectObjectSchema.optional(), data: z.union([ OnboardingResponseCreateManyInputObjectSchema, z.array(OnboardingResponseCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();