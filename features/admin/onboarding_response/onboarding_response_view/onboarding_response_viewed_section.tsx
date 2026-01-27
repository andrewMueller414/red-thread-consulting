"use client";
import React, { useCallback, useState, type ReactNode } from "react";
import { OnboardingResponseSubtitle } from "./onboarding_response_view_typography";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { trpc } from "@/features/trpc/trpc_provider";
import { OnboardingSummaryResponseItem } from "@/features/trpc/trpc_types";
dayjs.extend(advancedFormat);

interface OnboardingResponseViewReviewedSectionProps {
    item: OnboardingSummaryResponseItem;
}

export const OnboardingResponseViewReviewedSection = ({
    item,
}: OnboardingResponseViewReviewedSectionProps): ReactNode => {
    const [reviewedAt, setReviewedAt] = useState(item.reviewed_at);
    const [reviewedAtPopoverOpen, setReviewedAtPopoverOpen] = useState(false);
    const markReviewed = trpc.form.markReviewedById.useMutation();
    const toggleReviewed = useCallback(() => {
        markReviewed.mutate(
            {
                reviewed: !Boolean(reviewedAt),
                ids: [item.id],
            },
            {
                onError: (e) => {
                    console.error("Error: ", e.message);
                },
                onSuccess: (data) => {
                    if (data) {
                        setReviewedAt(reviewedAt ? null : new Date());
                        setReviewedAtPopoverOpen(false);
                    }
                },
            },
        );
    }, [reviewedAt, markReviewed, item]);
    return (
        <div className="w-full flex flex-col justify-start items-start">
            <OnboardingResponseSubtitle>Reviewed</OnboardingResponseSubtitle>
            <Popover
                open={reviewedAtPopoverOpen}
                onOpenChange={setReviewedAtPopoverOpen}
            >
                <PopoverTrigger asChild>
                    <Button className="bg-moss hover:bg-moss/80 text-fog hover:text-fog">
                        {reviewedAt
                            ? dayjs(reviewedAt).format("dddd, MMMM DD, YYYY h:mm A")
                            : "Not Reviewed"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-moss text-fog w-fit flex flex-col justify-center items-center">
                    <Button
                        onClick={toggleReviewed}
                    >{`Mark ${reviewedAt ? "Unreviewed" : "Reviewed"}`}</Button>
                </PopoverContent>
            </Popover>
        </div>
    );
};

OnboardingResponseViewReviewedSection.displayName =
    "OnboardingResponseViewReviewedSection";
