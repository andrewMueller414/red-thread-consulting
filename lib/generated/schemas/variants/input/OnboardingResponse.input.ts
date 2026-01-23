import * as z from 'zod';
// prettier-ignore
export const OnboardingResponseInputSchema = z.object({
    id: z.number().int(),
    name_first: z.string(),
    name_last: z.string(),
    how_can_i_help: z.string(),
    ctime: z.date(),
    reviewed_at: z.date().optional().nullable()
}).strict();

export type OnboardingResponseInputType = z.infer<typeof OnboardingResponseInputSchema>;
