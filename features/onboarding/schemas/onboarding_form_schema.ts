import { z } from "zod";

export const onboardingFormSchema = z.object({
    name: z.object({
        first: z.string().min(1, "Please include a first name."),
        last: z.string().min(1, "Please include a last name."),
    }),
});
