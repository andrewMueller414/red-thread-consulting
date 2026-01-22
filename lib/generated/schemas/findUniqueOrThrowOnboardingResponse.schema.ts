import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseSelectObjectSchema as OnboardingResponseSelectObjectSchema } from './objects/OnboardingResponseSelect.schema';
import { OnboardingResponseWhereUniqueInputObjectSchema as OnboardingResponseWhereUniqueInputObjectSchema } from './objects/OnboardingResponseWhereUniqueInput.schema';

export const OnboardingResponseFindUniqueOrThrowSchema: z.ZodType<Prisma.OnboardingResponseFindUniqueOrThrowArgs> = z.object({ select: OnboardingResponseSelectObjectSchema.optional(),  where: OnboardingResponseWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseFindUniqueOrThrowArgs>;

export const OnboardingResponseFindUniqueOrThrowZodSchema = z.object({ select: OnboardingResponseSelectObjectSchema.optional(),  where: OnboardingResponseWhereUniqueInputObjectSchema }).strict();