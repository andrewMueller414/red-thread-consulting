import { z } from "zod";

export const widthClassSchema = z
    .enum(["full", "fit"])
    .default("full")
    .transform((c) => (c === "full" ? "w-full" : "w-fit"));
