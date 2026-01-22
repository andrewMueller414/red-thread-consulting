import * as z from 'zod';
import type { Prisma } from '../../prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name_first: z.string(),
  name_last: z.string(),
  ctime: z.coerce.date().optional(),
  reviewed_at: z.coerce.date().optional().nullable()
}).strict();
export const OnboardingResponseCreateManyInputObjectSchema: z.ZodType<Prisma.OnboardingResponseCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseCreateManyInput>;
export const OnboardingResponseCreateManyInputObjectZodSchema = makeSchema();
