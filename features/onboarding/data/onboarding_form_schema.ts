import { formDataSchema } from "@/features/mdx/data/schemas/mdx_form_response";
import z from "zod";

export const onboardingFormSchema = formDataSchema;

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
