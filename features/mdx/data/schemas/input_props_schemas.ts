import { ReactNode } from "react";
import { z } from "zod";
import { embeddableInputSchema } from "../../embeddable_components/shared_schemas";
import {
  sizeEnum,
  sizeEnumWithFull,
} from "../../embeddable_components/media/image";
import { widthClassSchema } from "./shared_schemas";

export const checkboxPropsSchema = embeddableInputSchema.extend({
  title: z
    .string({ message: "Please provide a title" })
    .describe("The titledisplayed with the checkbox."),
  subtitle: z.string().optional(),
});

export const textInputPropsSchema = embeddableInputSchema.extend({
  label: z.string({ message: "A label is required" }),
  desc: z.string().optional(),
  name: z
    .string({ message: "A name field is required." })
    .min(1, "Include a name that isn't empty."),
  placeholder: z.string().optional(),
  maxWidth: z.enum(["small", "medium", "large", "full"]).default("full"),
});

export type TextInputProps = z.infer<typeof textInputPropsSchema>;

export const textAreaInputProps = textInputPropsSchema.extend({
  rows: z.number().int().default(3),
});

export const reorderInputProps = z.object({
  options: z
    .object({
      title: z
        .string({ message: "A title is required" })
        .min(1, "Please include a title that isn't empty"),
      subtitle: z.string().optional(),
      value: z.string().or(z.number()),
    })
    .array(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  name: z.string({ message: "You must include a name for all inputs." }),
});

export type ReorderInputProps = z.infer<typeof reorderInputProps>;
export type ReorderInputItem = z.infer<
  typeof reorderInputProps
>["options"][number];

export const selectInputPropsSchema = embeddableInputSchema.extend({
  options: z.string().array(),
  label: z.string({
    message: "Please provide a 'label' field for the select input.",
  }),
  placeholder: z.string().default("Select..."),
  width: sizeEnumWithFull.default("medium"),
});

export type SelectInputProps = z.infer<typeof selectInputPropsSchema>;

export const titlePropsSchema = z.object({
  depth: z
    .union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
      z.literal(6),
    ])
    .default(1),
  title: z.string(),
  subtitle: z.string().optional(),
  font: z
    .union(
      [z.literal("ss-pro"), z.literal("cormorant"), z.literal("mono")],
      "Please provide a font of 'ss-pro', 'cormorant', or 'mono'.",
    )
    .optional()
    .transform((s) => {
      switch (s) {
        case "ss-pro":
          return "font-ss-pro";
        case "cormorant":
          return "font-bellefair";
        case "mono":
          return "font-mono";
        default:
          return null;
      }
    }),
  width: widthClassSchema,
});

export type EmbeddabledTitleProps = z.infer<typeof titlePropsSchema>;

export const sliderPropsSchema = embeddableInputSchema
  .extend({
    label: z.string().optional(),
    min: z.number().default(0),
    max: z.number().default(1),
    step: z.number().default(0.1),
    initial: z.number().optional(),
    vertical: z.boolean().default(false),
    width: sizeEnumWithFull.default("medium"),
    showValue: z.boolean().default(false),
  })
  .transform((data) => {
    return {
      ...data,
      initial: data.initial ?? data.min + (data.max - data.min) / 2, // Set it to half way between max and min if it's undefined.
    };
  });

export type EmbeddableSliderProps = z.infer<typeof sliderPropsSchema>;
