import Image from "next/image";
import React, { type ReactNode } from "react";
import { OnboardingImageData } from "../onboarding_types";
import { motion } from "framer-motion";
const MotionImage = motion(Image);

interface OnboardingSectionImageProps {
    image: OnboardingImageData;
    priority?: boolean;
}

export const OnboardingSectionImage = ({
    image,
    priority = false,
}: OnboardingSectionImageProps): ReactNode => {
    return (
        <div className="max-h-80 lg:max-h-full lg:w-full h-full overflow-hidden flex flex-col justify-center items-center">
            <MotionImage
                src={image.src}
                alt={image.alt}
                width={1080}
                height={1080}
                className="max-w-[80%] max-h-80 lg:max-h-full object-contain"
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                initial="hide"
                whileInView={"show"}
                variants={{
                    show: {
                        opacity: 0.8,
                    },
                    hide: {
                        opacity: 0,
                    },
                }}
                whileHover={{
                    opacity: 0.83,
                }}
            />
        </div>
    );
};

OnboardingSectionImage.displayName = "OnboardingSectionImage";
