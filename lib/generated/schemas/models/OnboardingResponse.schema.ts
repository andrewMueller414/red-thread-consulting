import * as z from 'zod';
import { PriorityIdSchema } from '../enums/PriorityId.schema';

export const OnboardingResponseSchema = z.object({
  id: z.number().int(),
  name_first: z.string(),
  name_last: z.string(),
  how_can_i_help: z.string(),
  priorities: z.array(PriorityIdSchema),
  ctime: z.date(),
  reviewed_at: z.date().nullish(),
});

export type OnboardingResponseType = z.infer<typeof OnboardingResponseSchema>;
