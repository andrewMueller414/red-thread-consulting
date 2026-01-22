import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseSelectObjectSchema as OnboardingResponseSelectObjectSchema } from './objects/OnboardingResponseSelect.schema';
import { OnboardingResponseWhereUniqueInputObjectSchema as OnboardingResponseWhereUniqueInputObjectSchema } from './objects/OnboardingResponseWhereUniqueInput.schema';

export const OnboardingResponseFindUniqueSchema: z.ZodType<Prisma.OnboardingResponseFindUniqueArgs> = z.object({ select: OnboardingResponseSelectObjectSchema.optional(),  where: OnboardingResponseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseFindUniqueArgs>;

export const OnboardingResponseFindUniqueZodSchema = z.object({ select: OnboardingResponseSelectObjectSchema.optional(),  where: OnboardingResponseWhereUniqueInputObjectSchema }).strict();