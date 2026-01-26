import Image from "next/image";
import React, { type ReactNode } from "react";
import { OnboardingImageData } from "../onboarding_types";
import { motion, useMotionValue } from "framer-motion";
import { useViewportRelativeValue } from "@/core/state/hooks/use_viewport_relative_value";
const MotionImage = motion(Image);

interface OnboardingSectionImageProps {
    image: OnboardingImageData;
    priority?: boolean;
}

const MIN_OPACITY = 0.35;

const MAX_OPACITY = 0.8;

/** The maximum opacity (eg. 0.8) minus the minimum opacity (eg. 0.5) gives a `MAX_OPAC_MINUS_MIN_OPAC = 0.3` */
const MAX_OPAC_MINUS_MIN_OPAC = MAX_OPACITY - MIN_OPACITY;

export const OnboardingSectionImage = ({
    image,
    priority = false,
}: OnboardingSectionImageProps): ReactNode => {
    const opacity = useMotionValue(0);

    const ref = useViewportRelativeValue((n) => {
        opacity.set(MIN_OPACITY + MAX_OPAC_MINUS_MIN_OPAC * n);
    });
    return (
        <div className="max-h-80 lg:max-h-full lg:w-full h-full overflow-hidden flex flex-col justify-center items-center">
            <MotionImage
                src={image.src}
                alt={image.alt}
                ref={ref}
                width={1080}
                height={1080}
                className="max-w-[80%] max-h-80 lg:max-h-full object-contain"
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                initial="hide"
                whileInView={"show"}
                style={{
                    // @ts-expect-error -- This seems to be just a typing error, possibly due to using an old version of framer-motion and maybe a version mismatch, but the property works.
                    opacity,
                }}
                transition={{
                    duration: 0,
                }}
                variants={{
                    show: {
                        opacity: opacity.get(),
                    },
                    hide: {
                        opacity: 0,
                    },
                }}
            /* whileHover={{ */
            /*     opacity: 0.83, */
            /* }} */
            />
        </div>
    );
};

OnboardingSectionImage.displayName = "OnboardingSectionImage";
