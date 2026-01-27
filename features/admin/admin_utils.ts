import { OnboardingSummaryResponseItem } from "../trpc/trpc_types";

export const getFilteredResponseSummaries = (
    summaries: OnboardingSummaryResponseItem[],
    query: string,
): OnboardingSummaryResponseItem[] => {
    return summaries.filter((item) => {
        const lowerCaseQuery = query.toLowerCase();
        /* eslint-disable-next-line  -- Need to use any here. */
        const getDataMatch = (data: any): boolean => {
            switch (typeof data) {
                case "string":
                    return data.toLowerCase().includes(lowerCaseQuery);
                case "number":
                    return `${data}`.includes(query);
                case "boolean":
                    return (data ? "true" : "false").includes(lowerCaseQuery);
                case "object":
                    return Array.isArray(data) ? data.some(getDataMatch) : false;
                default:
                    return false;
            }
        };
        return Object.keys(item).some((k) => {
            const data = item[k as keyof typeof item];
            return getDataMatch(data);
        });
    });
};
