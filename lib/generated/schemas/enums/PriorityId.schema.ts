import * as z from 'zod';

export const PriorityIdSchema = z.enum(['GROWTH', 'FINANCIAL_INDEPENDENCE', 'COMMITTMENT', 'IMPACT', 'GIVING_BACK', 'SOCIAL_WELFARE'])

export type PriorityId = z.infer<typeof PriorityIdSchema>;