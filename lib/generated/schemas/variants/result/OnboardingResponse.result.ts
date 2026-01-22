import * as z from 'zod';
// prettier-ignore
export const OnboardingResponseResultSchema = z.object({
    id: z.number().int(),
    name_first: z.string(),
    name_last: z.string(),
    ctime: z.date(),
    reviewed_at: z.date().nullable()
}).strict();

export type OnboardingResponseResultType = z.infer<typeof OnboardingResponseResultSchema>;
