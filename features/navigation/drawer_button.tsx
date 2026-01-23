import React, {
    useEffect,
    useEffectEvent,
    useState,
    type ReactNode,
} from "react";
import { HeaderButton } from "./header";
import { motion } from "framer-motion";

interface DrawerButtonProps {
    item: HeaderButton;
    idx: number;
    open: boolean;
}

export const DrawerButton = ({
    item,
    idx,
    open,
}: DrawerButtonProps): ReactNode => {
    const [hasRendered, setHasRendered] = useState(false);
    const resetRendered = useEffectEvent(() => setHasRendered(false));
    useEffect(() => {
        if (!open) {
            resetRendered();
        }
    }, [open]);
    return (
        <motion.a
            /* @ts-expect-error -- This property works but the motion package is not typed properly. */
            className="w-full inline-block px-4 py-4 text-center drawer-fontsize"
            key={`drawer-${item.href}`}
            href={item.href}
            animate={open ? "open" : "close"}
            initial="close"
            variants={{
                open: {
                    opacity: 1,
                },
                close: {
                    opacity: 0,
                },
            }}
            transition={{
                delay: hasRendered ? 0 : idx * 0.1 + 0.5,
                onComplete: () => setHasRendered(true),
            }}
            whileHover={{
                opacity: 0.7,
            }}
        >
            {item.label}
        </motion.a>
    );
};

DrawerButton.displayName = "DrawerButton";
