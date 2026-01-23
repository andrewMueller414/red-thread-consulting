import { OnboardingResponseSchema } from "@/lib/generated/schemas";
import { baseProcedure, createTRPCRouter } from "../trpc_init";
import { prisma } from "@/lib/prisma";
import {
    dbEntityIdSchema,
    paginationSchema,
} from "@/features/db/schemas/database_utility_schemas";
import z from "zod";

export const onboardingRouter = createTRPCRouter({
    create: baseProcedure
        .input(OnboardingResponseSchema)
        .mutation(async ({ input }) => {
            try {
                delete (input as { id?: number }).id;
                await prisma.onboardingResponse.create({
                    data: {
                        ...input,
                    },
                });
                return true;
            } catch (err) {
                console.error("Error: ", err);
                return false;
            }
        }),
    deleteById: baseProcedure
        .input(dbEntityIdSchema.array())
        .mutation(async ({ input }) => {
            try {
                await prisma.onboardingResponse.deleteMany({
                    where: {
                        id: {
                            in: input.map((n) => n.id),
                        },
                    },
                });
                return true;
            } catch (err) {
                console.error("Error: ", err);
                return false;
            }
        }),
    getById: baseProcedure.input(dbEntityIdSchema).query(async ({ input }) => {
        try {
            const res = await prisma.onboardingResponse.findFirst({
                where: {
                    id: input.id,
                },
            });
            return res;
        } catch (err) {
            console.error("Error: ", err);
            return false;
        }
    }),
    getManySummaries: baseProcedure.query(async () => {
        try {
            const res = await prisma.onboardingResponse.findMany({
                select: {
                    id: true,
                    name_first: true,
                    name_last: true,
                    reviewed_at: false,
                    how_can_i_help: false,
                    ctime: true,
                },
                orderBy: {
                    ctime: "desc",
                },
            });
            return res;
        } catch (err) {
            console.error("Error: ", err);
            return [];
        }
    }),
    markReviewedById: baseProcedure
        .input(
            dbEntityIdSchema.extend({
                reviewed: z.boolean().default(true),
            }),
        )
        .mutation(async ({ input }) => {
            try {
                await prisma.onboardingResponse.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        reviewed_at: new Date(),
                    },
                });
                return true;
            } catch (err) {
                console.error("Error: ", err);
                return false;
            }
        }),
});
