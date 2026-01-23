import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { PriorityIdSchema } from '../enums/PriorityId.schema'

const makeSchema = () => z.object({
  set: PriorityIdSchema.array()
}).strict();
export const OnboardingResponseCreateprioritiesInputObjectSchema: z.ZodType<Prisma.OnboardingResponseCreateprioritiesInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseCreateprioritiesInput>;
export const OnboardingResponseCreateprioritiesInputObjectZodSchema = makeSchema();
