"use client";
import React, { useState, type ReactNode } from "react";
import { motion, useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReorderInputItem } from "../../../data/schemas/input_props_schemas";

const MotionDragHandle = motion(GripVertical);

interface ReorderItemProps {
    item: ReorderInputItem;
    disabled?: boolean;
    className?: string;
}

export const ReorderItem = ({
    item,
    disabled,
    className,
}: ReorderItemProps): ReactNode => {
    const controls = useDragControls();
    const [dragging, setDragging] = useState(false);
    return (
        <Reorder.Item
            className={cn(
                "text-xl font-bellefair border rounded px-4 py-3 bg-matcha w-full select-none touch-none flex flex-row justify-start items-center gap-x-4 overflow-clip my-0!",
                className,
            )}
            dragListener={false}
            dragControls={controls}
            value={item}
            whileDrag={{
                cursor: "grabbing",
                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                zIndex: 9999999,
                background: "var(--color-moss)",
                color: "var(--fog)",
            }}
            style={{
                willChange: "transform",
                background: "var(--matcha)",
                color: "var(--pine)",
            }}
            onDragStart={() => (disabled ? {} : setDragging(true))}
            onDragEnd={() => (disabled ? {} : setDragging(false))}
        >
            <MotionDragHandle
                className={cn(
                    "cursor-grab select-none touch-none",
                    dragging ? "stroke-fog/40" : "stroke-pine/40",
                )}
                onPointerDown={(e) => {
                    if (!disabled) {
                        controls.start(e);
                    }
                    e.preventDefault();
                    e.stopPropagation();
                }}
            />
            <div className="flex flex-col justify-center items-start">
                <div className="pointer-events-none">{item.title}</div>
                {item.subtitle ? (
                    <div className="text-sm font-mono indent-3">{item.subtitle}</div>
                ) : null}
            </div>
        </Reorder.Item>
    );
};

ReorderItem.displayName = "ReorderItem";
