import { OnboardingSummaryResponseItem } from "../trpc/trpc_types";

export const getFilteredResponseSummaries = (
  summaries: OnboardingSummaryResponseItem[],
  query: string,
): OnboardingSummaryResponseItem[] => {
  const queryString = query.toLowerCase();
  return summaries.filter((item) => {
    // FIXME: FIx these name fields now that they're nested in the data.
    if (item.name_last.toLowerCase().includes(queryString)) {
      return true;
    }

    if (item.name_first.toLowerCase().includes(queryString)) {
      return true;
    }
    return false;
  });
};
