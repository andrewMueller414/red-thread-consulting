import { useEffect, useEffectEvent, useState } from "react";

export const useHeightWithoutNav = () => {
    const [height, setHeight] = useState<number | null>(null);
    const handleHeight = (): void => {
        const header =
            document
                .getElementById("desktop-header-container")
                ?.getBoundingClientRect().height ??
            document
                .getElementById("mobile-header-container")
                ?.getBoundingClientRect().height;
        if (!header) {
            return;
        }
        const footer = document
            .getElementById("footer-container")
            ?.getBoundingClientRect().height;
        setHeight(
            typeof footer === "number"
                ? window.innerHeight - footer - header
                : window.innerHeight - header,
        );
    };

    const _handleHeight = useEffectEvent(() => {
        handleHeight();
    });
    useEffect(() => {
        _handleHeight();
        window.addEventListener("resize", handleHeight);
        window.removeEventListener("resize", handleHeight);
    }, []);
    return height;
};
