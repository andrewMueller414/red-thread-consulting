import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseUpdateManyMutationInputObjectSchema as OnboardingResponseUpdateManyMutationInputObjectSchema } from './objects/OnboardingResponseUpdateManyMutationInput.schema';
import { OnboardingResponseWhereInputObjectSchema as OnboardingResponseWhereInputObjectSchema } from './objects/OnboardingResponseWhereInput.schema';

export const OnboardingResponseUpdateManySchema: z.ZodType<Prisma.OnboardingResponseUpdateManyArgs> = z.object({ data: OnboardingResponseUpdateManyMutationInputObjectSchema, where: OnboardingResponseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseUpdateManyArgs>;

export const OnboardingResponseUpdateManyZodSchema = z.object({ data: OnboardingResponseUpdateManyMutationInputObjectSchema, where: OnboardingResponseWhereInputObjectSchema.optional() }).strict();