import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { OnboardingResponseSelectObjectSchema as OnboardingResponseSelectObjectSchema } from './OnboardingResponseSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => OnboardingResponseSelectObjectSchema).optional()
}).strict();
export const OnboardingResponseArgsObjectSchema = makeSchema();
export const OnboardingResponseArgsObjectZodSchema = makeSchema();
