import Image from "next/image";
import React, { type ReactNode } from "react";
import { OnboardingFormSectionItem } from "../onboarding_types";

interface OnboardingSectionImageProps {
    image: OnboardingFormSectionItem["image"];
}

export const OnboardingSectionImage = ({
    image,
}: OnboardingSectionImageProps): ReactNode => {
    return (
        <div className="max-h-80 lg:max-h-full lg:w-full h-full overflow-hidden flex flex-col justify-center items-center">
            <Image
                src={image.src}
                objectFit="contain"
                alt={image.alt}
                width={1080}
                height={1080}
                className="max-w-[80%] max-h-80 lg:max-h-full object-contain opacity-80"
            />
        </div>
    );
};

OnboardingSectionImage.displayName = "OnboardingSectionImage";
