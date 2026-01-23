import { OnboardingSummaryResponseItem } from "../trpc/type_types";

export const getFilteredResponseSummaries = (
    summaries: OnboardingSummaryResponseItem[],
    query: string,
): OnboardingSummaryResponseItem[] => {
    const queryString = query.toLowerCase();
    return summaries.filter((item) => {
        if (item.name_last.toLowerCase().includes(queryString)) {
            return true;
        }

        if (item.name_first.toLowerCase().includes(queryString)) {
            return true;
        }
        return false;
    });
};
