"use client";
import React, { useCallback, useState, type ReactNode } from "react";
import { OnboardingResponseSubtitle } from "./onboarding_response_view_typography";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { trpc } from "@/features/trpc/trpc_provider";
import { OnboardingSummaryResponseItem } from "@/features/trpc/trpc_types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { FormResponseInputView } from "../../../forms/presentation/form_response/form_response_input_views/form_response_input_view";
dayjs.extend(advancedFormat);

interface OnboardingResponseViewReviewedSectionProps {
    item: Exclude<OnboardingSummaryResponseItem, false>;
}

export const OnboardingResponseViewReviewedSection = ({
    item,
}: OnboardingResponseViewReviewedSectionProps): ReactNode => {
    const [reviewedAt, setReviewedAt] = useState<Date | null>(
        item?.reviewed_at ?? null,
    );
    const [reviewedAtPopoverOpen, setReviewedAtPopoverOpen] = useState(false);
    const markReviewed = trpc.form.markReviewedById.useMutation();
    const toggleReviewed = useCallback(() => {
        const id = item?.id;
        if (!id) {
            return;
        }
        markReviewed.mutate(
            {
                reviewed: !Boolean(reviewedAt),
                ids: [id],
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
            <DropdownMenu
                open={reviewedAtPopoverOpen}
                onOpenChange={setReviewedAtPopoverOpen}
            >
                <DropdownMenuTrigger asChild>
                    <Button className="text-moss hover:bg-moss/20">
                        {reviewedAt
                            ? dayjs(reviewedAt).format("dddd, MMMM DD, YYYY h:mm A")
                            : "Not Reviewed"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-matcha text-pine w-fit flex flex-col justify-center items-center">
                    <DropdownMenuItem onClick={toggleReviewed}>
                        {`Mark ${reviewedAt ? "Unreviewed" : "Reviewed"}`}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="w-full max-w-[min(1080px,90vw)]">
                {item?.data
                    ? item.mdxSource.formFieldNames.map((dataKey, i, a) => {
                        return (
                            <div key={dataKey} className="w-full h-fit">
                                <FormResponseInputView
                                    data={item.data![dataKey as keyof typeof item.data]}
                                    name={dataKey}
                                    key={dataKey}
                                />
                                {i <= a.length - 1 ? (
                                    <div className="w-full bg-moss/20 h-0.5 mt-8" />
                                ) : null}
                            </div>
                        );
                    })
                    : null}
            </div>
        </div>
    );
};

OnboardingResponseViewReviewedSection.displayName =
    "OnboardingResponseViewReviewedSection";
