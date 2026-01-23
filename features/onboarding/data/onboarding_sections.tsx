import { FormSectionOne } from "../onboarding_form/form_sections/form_section_1";
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
        title: "Lorem Ipsum",
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
];
