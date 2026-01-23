import { OnboardingResponseSchema } from "@/lib/generated/schemas";
import z from "zod";

export const onboardingFormSchema = OnboardingResponseSchema.omit({
    reviewed_at: true,
    ctime: true,
    id: true,
});

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
