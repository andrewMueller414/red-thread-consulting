import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseSelectObjectSchema as OnboardingResponseSelectObjectSchema } from './objects/OnboardingResponseSelect.schema';
import { OnboardingResponseUpdateInputObjectSchema as OnboardingResponseUpdateInputObjectSchema } from './objects/OnboardingResponseUpdateInput.schema';
import { OnboardingResponseUncheckedUpdateInputObjectSchema as OnboardingResponseUncheckedUpdateInputObjectSchema } from './objects/OnboardingResponseUncheckedUpdateInput.schema';
import { OnboardingResponseWhereUniqueInputObjectSchema as OnboardingResponseWhereUniqueInputObjectSchema } from './objects/OnboardingResponseWhereUniqueInput.schema';

export const OnboardingResponseUpdateOneSchema: z.ZodType<Prisma.OnboardingResponseUpdateArgs> = z.object({ select: OnboardingResponseSelectObjectSchema.optional(),  data: z.union([OnboardingResponseUpdateInputObjectSchema, OnboardingResponseUncheckedUpdateInputObjectSchema]), where: OnboardingResponseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseUpdateArgs>;

export const OnboardingResponseUpdateOneZodSchema = z.object({ select: OnboardingResponseSelectObjectSchema.optional(),  data: z.union([OnboardingResponseUpdateInputObjectSchema, OnboardingResponseUncheckedUpdateInputObjectSchema]), where: OnboardingResponseWhereUniqueInputObjectSchema }).strict();