import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { PriorityIdSchema } from '../enums/PriorityId.schema'

const makeSchema = () => z.object({
  set: PriorityIdSchema.array().optional(),
  push: z.union([PriorityIdSchema, PriorityIdSchema.array()]).optional()
}).strict();
export const OnboardingResponseUpdateprioritiesInputObjectSchema: z.ZodType<Prisma.OnboardingResponseUpdateprioritiesInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseUpdateprioritiesInput>;
export const OnboardingResponseUpdateprioritiesInputObjectZodSchema = makeSchema();
