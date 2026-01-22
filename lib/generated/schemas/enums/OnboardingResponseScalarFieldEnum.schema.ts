import * as z from 'zod';

export const OnboardingResponseScalarFieldEnumSchema = z.enum(['id', 'name_first', 'name_last', 'ctime', 'reviewed_at'])

export type OnboardingResponseScalarFieldEnum = z.infer<typeof OnboardingResponseScalarFieldEnumSchema>;