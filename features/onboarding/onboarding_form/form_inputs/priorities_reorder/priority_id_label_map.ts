import { PriorityId } from "@/lib/generated/prisma/enums";

export const priorityIdLabelMap: { [K in PriorityId]: string } = {
    [PriorityId.GROWTH]: "Growth",
    [PriorityId.IMPACT]: "Impact",
    [PriorityId.COMMITTMENT]: "Committment",
    [PriorityId.GIVING_BACK]: "Giving Back",
    [PriorityId.SOCIAL_WELFARE]: "Social Welfare",
    [PriorityId.FINANCIAL_INDEPENDENCE]: "Financial Independence",
};
