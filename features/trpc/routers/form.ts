import { baseProcedure, createTRPCRouter } from "../trpc_init";
import { prisma } from "@/lib/prisma";
import { dbEntityIdSchema } from "@/features/db/schemas/database_utility_schemas";
import z from "zod";
import { Prisma } from "@/lib/generated/prisma/client";
import { RedThreadError } from "@/core/errors/red_thread_error";
import superjson, { SuperJSONResult } from "superjson";
import { mdxFormSchema } from "@/features/mdx/data/schemas/mdx_form_response";

export const formRouter = createTRPCRouter({
    create: baseProcedure
        .input(
            mdxFormSchema.omit({
                id: true,
                ctime: true,
                reviewed_at: true,
            }),
        )
        .mutation(async ({ input }) => {
            console.dir(input, { colors: true, depth: 5 });
            try {
                delete (input as { id?: number }).id;
                const data = superjson.serialize(input.data);
                await prisma.formResponse.create({
                    data: {
                        ...input,
                        /* eslint-disable-next-line  -- need to cast to any here  */
                        data: data as any,
                        ctime: new Date(),
                        reviewed_at: null,
                    },
                });
                return true;
            } catch (err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === "P2003") {
                        const meta = err.meta as {
                            driverAdapterError?: {
                                cause?: {
                                    kind?: string;
                                    constraint?: {
                                        index?: string;
                                    };
                                };
                            };
                        };
                        if (
                            meta?.driverAdapterError?.cause?.kind ===
                            "ForeignKeyConstraintViolation" &&
                            meta?.driverAdapterError?.cause?.constraint?.index ===
                            "FormResponse_mdxSourceId_fkey"
                        ) {
                            throw new Error(
                                "The formId provided to the FormSubmit component does not appear to exist.",
                                {
                                    cause: RedThreadError.formIdDoesNotExist,
                                },
                            );
                        }
                    }
                }
                console.error("Error: ", err);
                return false;
            }
        }),
    deleteById: baseProcedure
        .input(dbEntityIdSchema.array())
        .mutation(async ({ input }) => {
            try {
                await prisma.formResponse.deleteMany({
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
            const res = await prisma.formResponse.findFirst({
                where: {
                    id: input.id,
                },
                select: {
                    reviewed_at: true,
                    data: true,
                    ctime: true,
                    id: true,
                    mdxSource: {
                        select: {
                            id: true,
                            formFieldNames: true,
                        },
                    },
                },
            });
            if (res) {
                res.data = superjson.deserialize(
                    res.data as unknown as SuperJSONResult,
                );
            }
            return res;
        } catch (err) {
            console.error("Error: ", err);
            return false;
        }
    }),
    getMany: baseProcedure.query(async () => {
        try {
            const res = await prisma.formResponse.findMany({
                select: {
                    id: true,
                    data: true,
                    ctime: true,
                    mdxSourceId: true,
                    reviewed_at: true,
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
            z.object({
                reviewed: z.boolean(),
                ids: z.number().int().array(),
            }),
        )
        .mutation(async ({ input }) => {
            try {
                await prisma.formResponse.updateMany({
                    where: {
                        id: {
                            in: input.ids,
                        },
                    },
                    data: {
                        reviewed_at: input.reviewed ? new Date() : null,
                    },
                });
                return true;
            } catch (err) {
                console.error("Error: ", err);
                return false;
            }
        }),
});
