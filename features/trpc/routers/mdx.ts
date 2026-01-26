import { baseProcedure, createTRPCRouter } from "../trpc_init";
import { prisma } from "@/lib/prisma";
import { mdxContentSchema } from "@/features/mdx/data/schemas/mdx_content";
import { compileMdxServer } from "@/features/mdx/methods/parse_mdx_server";
import { z } from "zod";

export const mdxRouter = createTRPCRouter({
    getById: baseProcedure
        .input(
            mdxContentSchema.pick({
                id: true,
            }),
        )
        .query(async ({ input }) => {
            return await prisma.mdxContent.findFirst({
                where: {
                    id: {
                        equals: input.id,
                    },
                },
            });
        }),
    getSummaries: baseProcedure.query(async () => {
        return await prisma.mdxContent.findMany({
            select: {
                id: true,
                ctime: true,
                formId: true,
                utime: true,
            },
        });
    }),
    parseMdxContent: baseProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            return await compileMdxServer(input);
        }),
    save: baseProcedure.input(mdxContentSchema).query(async ({ input }) => {
        return await prisma.mdxContent.upsert({
            where: {
                id: input.id,
            },
            create: {
                ...input,
            },
            update: {
                ...input,
            },
        });
    }),
});
