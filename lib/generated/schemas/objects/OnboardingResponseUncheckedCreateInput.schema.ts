import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { OnboardingResponseCreateprioritiesInputObjectSchema as OnboardingResponseCreateprioritiesInputObjectSchema } from './OnboardingResponseCreateprioritiesInput.schema';
import { PriorityIdSchema } from '../enums/PriorityId.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name_first: z.string(),
  name_last: z.string(),
  how_can_i_help: z.string(),
  priorities: z.union([z.lazy(() => OnboardingResponseCreateprioritiesInputObjectSchema), PriorityIdSchema.array()]).optional(),
  ctime: z.coerce.date().optional(),
  reviewed_at: z.coerce.date().optional().nullable()
}).strict();
export const OnboardingResponseUncheckedCreateInputObjectSchema: z.ZodType<Prisma.OnboardingResponseUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseUncheckedCreateInput>;
export const OnboardingResponseUncheckedCreateInputObjectZodSchema = makeSchema();
