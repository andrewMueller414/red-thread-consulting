import * as z from 'zod';
import type { Prisma } from '../../prisma/client';


const makeSchema = () => z.object({
  name_first: z.string(),
  name_last: z.string(),
  ctime: z.coerce.date().optional(),
  reviewed_at: z.coerce.date().optional().nullable()
}).strict();
export const OnboardingResponseCreateInputObjectSchema: z.ZodType<Prisma.OnboardingResponseCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseCreateInput>;
export const OnboardingResponseCreateInputObjectZodSchema = makeSchema();
