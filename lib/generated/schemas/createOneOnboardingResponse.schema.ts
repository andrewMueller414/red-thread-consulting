import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseSelectObjectSchema as OnboardingResponseSelectObjectSchema } from './objects/OnboardingResponseSelect.schema';
import { OnboardingResponseCreateInputObjectSchema as OnboardingResponseCreateInputObjectSchema } from './objects/OnboardingResponseCreateInput.schema';
import { OnboardingResponseUncheckedCreateInputObjectSchema as OnboardingResponseUncheckedCreateInputObjectSchema } from './objects/OnboardingResponseUncheckedCreateInput.schema';

export const OnboardingResponseCreateOneSchema: z.ZodType<Prisma.OnboardingResponseCreateArgs> = z.object({ select: OnboardingResponseSelectObjectSchema.optional(),  data: z.union([OnboardingResponseCreateInputObjectSchema, OnboardingResponseUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseCreateArgs>;

export const OnboardingResponseCreateOneZodSchema = z.object({ select: OnboardingResponseSelectObjectSchema.optional(),  data: z.union([OnboardingResponseCreateInputObjectSchema, OnboardingResponseUncheckedCreateInputObjectSchema]) }).strict();