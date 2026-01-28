import { baseProcedure, createTRPCRouter } from "../trpc_init";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";
import z from "zod";
import { deleteImage, uploadImage } from "../../media/data/get_aws";
import { zodFileObject } from "@/features/media/data/zod_file_object";

export const adminRouter = createTRPCRouter({
    uploadImage: baseProcedure
        .input(
            z.object({
                file: zodFileObject,
                id: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            const session = await getServerSession(authOptions);
            if (!session) {
                return false;
            }
            return await uploadImage(
                input.id,
                new File([input.file.contents], input.file.name, {
                    type: input.file.type,
                }),
            );
        }),
    deleteImage: baseProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            const session = await getServerSession(authOptions);
            if (!session) {
                return false;
            }

            return await deleteImage(input.id);
        }),
});
