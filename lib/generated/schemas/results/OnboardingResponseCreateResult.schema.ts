import * as z from 'zod';
export const OnboardingResponseCreateResultSchema = z.object({
  id: z.number().int(),
  name_first: z.string(),
  name_last: z.string(),
  how_can_i_help: z.string(),
  priorities: z.array(z.unknown()),
  ctime: z.date(),
  reviewed_at: z.date().optional()
});