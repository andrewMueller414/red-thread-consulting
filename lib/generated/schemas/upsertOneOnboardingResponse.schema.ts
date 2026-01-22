import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseSelectObjectSchema as OnboardingResponseSelectObjectSchema } from './objects/OnboardingResponseSelect.schema';
import { OnboardingResponseWhereUniqueInputObjectSchema as OnboardingResponseWhereUniqueInputObjectSchema } from './objects/OnboardingResponseWhereUniqueInput.schema';
import { OnboardingResponseCreateInputObjectSchema as OnboardingResponseCreateInputObjectSchema } from './objects/OnboardingResponseCreateInput.schema';
import { OnboardingResponseUncheckedCreateInputObjectSchema as OnboardingResponseUncheckedCreateInputObjectSchema } from './objects/OnboardingResponseUncheckedCreateInput.schema';
import { OnboardingResponseUpdateInputObjectSchema as OnboardingResponseUpdateInputObjectSchema } from './objects/OnboardingResponseUpdateInput.schema';
import { OnboardingResponseUncheckedUpdateInputObjectSchema as OnboardingResponseUncheckedUpdateInputObjectSchema } from './objects/OnboardingResponseUncheckedUpdateInput.schema';

export const OnboardingResponseUpsertOneSchema: z.ZodType<Prisma.OnboardingResponseUpsertArgs> = z.object({ select: OnboardingResponseSelectObjectSchema.optional(),  where: OnboardingResponseWhereUniqueInputObjectSchema, create: z.union([ OnboardingResponseCreateInputObjectSchema, OnboardingResponseUncheckedCreateInputObjectSchema ]), update: z.union([ OnboardingResponseUpdateInputObjectSchema, OnboardingResponseUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseUpsertArgs>;

export const OnboardingResponseUpsertOneZodSchema = z.object({ select: OnboardingResponseSelectObjectSchema.optional(),  where: OnboardingResponseWhereUniqueInputObjectSchema, create: z.union([ OnboardingResponseCreateInputObjectSchema, OnboardingResponseUncheckedCreateInputObjectSchema ]), update: z.union([ OnboardingResponseUpdateInputObjectSchema, OnboardingResponseUncheckedUpdateInputObjectSchema ]) }).strict();