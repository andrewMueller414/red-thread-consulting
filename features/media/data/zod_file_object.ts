import { z } from "zod";

export const zodFileObject = z.object({
    name: z.string(),
    type: z.string(),
    contents: z.instanceof(Uint8Array),
});

export const fileToZodObject = async (
    f: File,
): Promise<z.infer<typeof zodFileObject>> => {
    const bytes = await f.arrayBuffer();
    const uint8Array = new Uint8Array(bytes);
    return {
        name: f.name,
        type: f.type,
        contents: uint8Array,
    };
};
