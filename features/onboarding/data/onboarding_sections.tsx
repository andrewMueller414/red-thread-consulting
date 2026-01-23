import { FormSectionOne } from "../onboarding_form/form_sections/form_section_1";
import { PriorityReorderFormSection } from "../onboarding_form/form_sections/priority_reorder_section";
import { OnboardingFormSectionItem } from "../onboarding_types";

export const onboardingSections: OnboardingFormSectionItem[] = [
    {
        title: "Lorem Ipsum",
        subtitle:
            "Quam dolor magna aliquam ac dictumst dui donec augue nunc. Dui bibendum mi rhoncus integer bibendum, lacus congue nibh, ante.",
        Body: ({ form }) => {
            return <FormSectionOne form={form} />;
        },
        image: {
            src: "/onboarding/wild_horses.jpg",
            alt: "Wild horses",
        },
    },

    {
        title: "Lorem Ipsum Quam",
        subtitle:
            "Quam dolor magna aliquam ac dictumst dui donec augue nunc. Dui bibendum mi rhoncus integer bibendum, lacus congue nibh, ante.",
        Body: ({ form }) => {
            return <FormSectionOne form={form} />;
        },
        image: {
            src: "/onboarding/northern_wilderness.jpg",
            alt: "Wild horses",
        },
    },
    {
        title: "Priorities",
        subtitle:
            "To help me understand your priorities and what we should focus on, please reorder these categories in the order of importance.",
        Body: ({ form }) => {
            return <PriorityReorderFormSection form={form} />;
        },
        image: "full-width-body",
    },
];
