import * as z from 'zod';
export const OnboardingResponseUpdateResultSchema = z.nullable(z.object({
  id: z.number().int(),
  name_first: z.string(),
  name_last: z.string(),
  ctime: z.date(),
  reviewed_at: z.date().optional()
}));