import * as z from 'zod';
import type { Prisma } from '../../prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name_first: z.boolean().optional(),
  name_last: z.boolean().optional(),
  how_can_i_help: z.boolean().optional(),
  priorities: z.boolean().optional(),
  ctime: z.boolean().optional(),
  reviewed_at: z.boolean().optional()
}).strict();
export const OnboardingResponseSelectObjectSchema: z.ZodType<Prisma.OnboardingResponseSelect> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseSelect>;
export const OnboardingResponseSelectObjectZodSchema = makeSchema();
