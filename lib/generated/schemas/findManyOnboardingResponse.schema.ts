import type { Prisma } from '../prisma/client';
import * as z from 'zod';
import { OnboardingResponseOrderByWithRelationInputObjectSchema as OnboardingResponseOrderByWithRelationInputObjectSchema } from './objects/OnboardingResponseOrderByWithRelationInput.schema';
import { OnboardingResponseWhereInputObjectSchema as OnboardingResponseWhereInputObjectSchema } from './objects/OnboardingResponseWhereInput.schema';
import { OnboardingResponseWhereUniqueInputObjectSchema as OnboardingResponseWhereUniqueInputObjectSchema } from './objects/OnboardingResponseWhereUniqueInput.schema';
import { OnboardingResponseScalarFieldEnumSchema } from './enums/OnboardingResponseScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OnboardingResponseFindManySelectSchema: z.ZodType<Prisma.OnboardingResponseSelect> = z.object({
    id: z.boolean().optional(),
    name_first: z.boolean().optional(),
    name_last: z.boolean().optional(),
    how_can_i_help: z.boolean().optional(),
    ctime: z.boolean().optional(),
    reviewed_at: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseSelect>;

export const OnboardingResponseFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    name_first: z.boolean().optional(),
    name_last: z.boolean().optional(),
    how_can_i_help: z.boolean().optional(),
    ctime: z.boolean().optional(),
    reviewed_at: z.boolean().optional()
  }).strict();

export const OnboardingResponseFindManySchema: z.ZodType<Prisma.OnboardingResponseFindManyArgs> = z.object({ select: OnboardingResponseFindManySelectSchema.optional(),  orderBy: z.union([OnboardingResponseOrderByWithRelationInputObjectSchema, OnboardingResponseOrderByWithRelationInputObjectSchema.array()]).optional(), where: OnboardingResponseWhereInputObjectSchema.optional(), cursor: OnboardingResponseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OnboardingResponseScalarFieldEnumSchema, OnboardingResponseScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OnboardingResponseFindManyArgs>;

export const OnboardingResponseFindManyZodSchema = z.object({ select: OnboardingResponseFindManySelectSchema.optional(),  orderBy: z.union([OnboardingResponseOrderByWithRelationInputObjectSchema, OnboardingResponseOrderByWithRelationInputObjectSchema.array()]).optional(), where: OnboardingResponseWhereInputObjectSchema.optional(), cursor: OnboardingResponseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OnboardingResponseScalarFieldEnumSchema, OnboardingResponseScalarFieldEnumSchema.array()]).optional() }).strict();