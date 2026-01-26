import { useEffect, useRef } from "react";

export const useViewportRelativeValue = <T extends HTMLElement>(
    cb: (progress: number) => void,
) => {
    const ref = useRef<T | null>(null);

    const handleScroll = (): void => {
        const em = ref.current;
        if (em) {
            const rect = em.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const elementHeight = rect.height;
            const viewportCenter = viewportHeight / 2;
            const elementCenter = rect.top + elementHeight / 2;
            const maxDistance = (viewportHeight + elementHeight) / 2;
            const currentDistance = Math.abs(viewportCenter - elementCenter);
            const progress = 1 - currentDistance / maxDistance;
            cb(progress);
        }
    };
    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return ref;
};
