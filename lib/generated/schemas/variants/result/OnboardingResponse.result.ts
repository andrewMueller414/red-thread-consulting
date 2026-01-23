import * as z from 'zod';
import { PriorityIdSchema } from '../../enums/PriorityId.schema';
// prettier-ignore
export const OnboardingResponseResultSchema = z.object({
    id: z.number().int(),
    name_first: z.string(),
    name_last: z.string(),
    how_can_i_help: z.string(),
    priorities: PriorityIdSchema.array(),
    ctime: z.date(),
    reviewed_at: z.date().nullable()
}).strict();

export type OnboardingResponseResultType = z.infer<typeof OnboardingResponseResultSchema>;
