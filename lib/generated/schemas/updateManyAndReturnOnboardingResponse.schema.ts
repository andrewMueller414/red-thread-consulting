import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseSelectObjectSchema as OnboardingResponseSelectObjectSchema } from './objects/OnboardingResponseSelect.schema';
import { OnboardingResponseUpdateManyMutationInputObjectSchema as OnboardingResponseUpdateManyMutationInputObjectSchema } from './objects/OnboardingResponseUpdateManyMutationInput.schema';
import { OnboardingResponseWhereInputObjectSchema as OnboardingResponseWhereInputObjectSchema } from './objects/OnboardingResponseWhereInput.schema';

export const OnboardingResponseUpdateManyAndReturnSchema: z.ZodType<Prisma.OnboardingResponseUpdateManyAndReturnArgs> = z.object({ select: OnboardingResponseSelectObjectSchema.optional(), data: OnboardingResponseUpdateManyMutationInputObjectSchema, where: OnboardingResponseWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseUpdateManyAndReturnArgs>;

export const OnboardingResponseUpdateManyAndReturnZodSchema = z.object({ select: OnboardingResponseSelectObjectSchema.optional(), data: OnboardingResponseUpdateManyMutationInputObjectSchema, where: OnboardingResponseWhereInputObjectSchema.optional() }).strict();