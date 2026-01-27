import { baseProcedure, createTRPCRouter } from "../trpc_init";
import { prisma } from "@/lib/prisma";
import { mdxContentSchema } from "@/features/mdx/data/schemas/mdx_content";
import { compileMdxServer } from "@/features/mdx/methods/parse_mdx_server";
import { z } from "zod";
import path from "path";
import fs from "fs";

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
                utime: true,
            },
        });
    }),
    parseMdxContent: baseProcedure
        .input(z.string())
        .mutation(async ({ input }) => {
            return await compileMdxServer(input);
        }),
    save: baseProcedure.input(mdxContentSchema).mutation(async ({ input }) => {
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
    getDocByFilePath: baseProcedure
        .input(z.string().default("embeddable_components.mdx"))
        .query(async ({ input }) => {
            const p = path.resolve(process.cwd(), "content", "component_docs", input);
            if (fs.existsSync(p)) {
                return await fs.promises.readFile(p, {
                    encoding: "utf-8",
                });
            } else {
                return false;
            }
        }),
});
