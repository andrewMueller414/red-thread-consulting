import * as z from 'zod';

export const OnboardingResponseSchema = z.object({
  id: z.number().int(),
  name_first: z.string(),
  name_last: z.string(),
  ctime: z.date(),
  reviewed_at: z.date().nullish(),
});

export type OnboardingResponseType = z.infer<typeof OnboardingResponseSchema>;
