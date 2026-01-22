import * as z from 'zod';
// prettier-ignore
export const OnboardingResponseModelSchema = z.object({
    id: z.number().int(),
    name_first: z.string(),
    name_last: z.string(),
    ctime: z.date(),
    reviewed_at: z.date().nullable()
}).strict();

export type OnboardingResponsePureType = z.infer<typeof OnboardingResponseModelSchema>;
