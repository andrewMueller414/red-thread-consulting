"use client";
import React, { useState, type ReactNode } from "react";
import z from "zod";
import { motion } from "framer-motion";
import { MdxContent } from "../../../presentation/mdx_content";
import { ChevronDown as CD } from "lucide-react";
import { cn } from "../../../../../lib/utils";

const ChevronDown = motion(CD);

const calloutPropsSchema = z.object({
    type: z.enum([
        "note",
        "tip",
        "important",
        "warning",
        "caution",
        "pine",
        "mist",
        "fog",
        "moss",
        "dust",
        "matcha",
        "cream",
    ]),

    title: z.string(),
    foldable: z.boolean().default(false),
    folded: z.boolean().default(true),
});

export type CalloutProps = z.infer<typeof calloutPropsSchema>;

export const Callout = ({
    children,
    ...props
}: CalloutProps & { children: ReactNode }): ReactNode => {
    console.log("typeof props.title: ", props.title);
    const { type, title, folded, foldable } = calloutPropsSchema.parse(props);
    const [open, setOpen] = useState(foldable && folded ? false : true);
    return (
        <motion.div
            animate={open ? "show" : "hide"}
            initial={open}
            data-callout={type}
            /* @ts-expect-error -- This type works, but there's a type error on framer-motion's end. */
            className="px-4 py-3 rounded-lg my-6"
        >
            <div
                className={cn(
                    "not-prose font-semibold text-[14px] [&>p]:my-0 py-2",
                    foldable && "grid grid-cols-[1fr_auto]",
                )}
                onClick={() => {
                    if (foldable) {
                        setOpen(!open);
                    }
                }}
            >
                {foldable ? (
                    <>
                        <MdxContent mdx={title} inline />
                        <ChevronDown
                            animate={open ? "show" : "hide"}
                            variants={{
                                show: {
                                    rotateZ: 180,
                                },
                                hide: {
                                    rotateZ: 0,
                                },
                            }}
                        />
                    </>
                ) : (
                    <MdxContent mdx={title} inline />
                )}
            </div>
            <motion.div
                animate={open ? "show" : "hide"}
                variants={{
                    show: {
                        height: "fit-content",
                        opacity: 1,
                    },
                    hide: {
                        height: "0px",
                        opacity: 0,
                    },
                }}
                /* @ts-expect-error -- This type works, but there's a type error on framer-motion's end. */
                className="[&>p]:my-0 text-sm"
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

Callout.displayName = "Callout";
