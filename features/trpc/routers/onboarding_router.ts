import { onboardingFormSchema } from "@/features/onboarding/schemas/onboarding_form_schema";
import { baseProcedure, createTRPCRouter } from "../trpc_init";

export const onboardingRouter = createTRPCRouter({
    create: baseProcedure.input(onboardingFormSchema).mutation(({ input }) => {
        console.log("input: ", input);
    }),
});
