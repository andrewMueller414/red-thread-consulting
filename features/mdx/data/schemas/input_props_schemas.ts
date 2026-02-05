import { HTMLInputTypeAttribute } from "react";
import { z } from "zod";
import {
  colorEnumRecord,
  embeddableInputSchema,
  firstThemeColorValue,
  ThemeColor,
} from "../../embeddable_components/shared_schemas";
import {
  getSizePropsString,
  sizeEnumWithFull,
  sizePropsObject,
} from "../../embeddable_components/media/image";
import { widthClassSchema } from "./shared_schemas";

export const checkboxPropsSchema = embeddableInputSchema.extend({
  title: z
    .string({ message: "Please provide a title" })
    .describe("The titledisplayed with the checkbox."),
  subtitle: z.string().optional(),
});

export const textInputPropsSchema = embeddableInputSchema
  .merge(sizePropsObject)
  .extend({
    width: sizeEnumWithFull.optional().transform((w) => {
      switch (w) {
        case "full":
          return "w-full";
        case "small":
          return "w-full @5xl/mdx:max-w-60";
        case "medium":
          return "w-full @5xl/mdx:max-w-120";
        case "large":
          return "w-full @5xl/mdx:max-w-180";
      }
      if (typeof w === "string") {
        return w;
      }
    }),
    label: z.string({ message: "A label is required" }),
    desc: z.string().optional(),
    name: z
      .string({ message: "A name field is required." })
      .min(1, "Include a name that isn't empty."),
    placeholder: z.string().optional(),
    type: z
      .enum(
        [
          "text",
          "email",
          "tel",
          "number",
          "search",
          "url",
        ] satisfies HTMLInputTypeAttribute[],
        `Please select one of ${[
          "text",
          "email",
          "tel",
          "number",
          "search",
          "url",
        ].join(", ")}.`,
      )
      .default("text"),
  });

export type TextInputProps = z.infer<typeof textInputPropsSchema>;

export const textAreaInputProps = textInputPropsSchema
  .merge(sizePropsObject)
  .extend({
    rows: z.number().int().default(3),
  })
  .transform((c) => {
    return {
      ...c,
      sizeClasses: getSizePropsString(c),
    };
  });

export const reorderItemSchema = z.object({
  title: z
    .string({ message: "A title is required" })
    .min(1, "Please include a title that isn't empty"),
  subtitle: z.string().optional(),
  value: z.string().or(z.number()),
});

export const reorderInputProps = z.object({
  options: reorderItemSchema.array(),
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

export const fontNames = ["ss-pro", "cormorant", "mono"] as const;
export const parsedFontNames = [
  "font-ss-pro",
  "font-bellefair",
  "font-mono",
] as const;

export const getFontClassSchema = (defaultFont: (typeof fontNames)[number]) => {
  return z
    .enum(
      [...fontNames, ...parsedFontNames],
      "Please provide a font of 'ss-pro', 'cormorant', or 'mono'.",
    )
    .default(defaultFont)
    .transform((s) => {
      switch (s) {
        case "ss-pro":
          return "font-ss-pro";
        case "cormorant":
          return "font-bellefair";
        case "mono":
          return "font-mono";
      }
      if (typeof s === "string") {
        return s;
      }
    });
};

export const titlePropsSchema = colorEnumRecord.extend({
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
  font: getFontClassSchema("ss-pro"),
  width: widthClassSchema,
});

export type EmbeddabledTitleProps = z.infer<typeof titlePropsSchema>;

const getSliderColorClasses = (k: ThemeColor): string => {
  switch (k) {
    case "cream": {
      return "accemt-cream";
    }

    case "matcha": {
      return "accent-matcha";
    }
    case "fog": {
      return "accent-fog";
    }
    case "mist": {
      return "accent-mist";
    }
    case "pine": {
      return "accent-pine";
    }
    case "moss": {
      return "accent-moss";
    }
    case "dust": {
      return "accent-dust";
    }
  }
};

export const sliderPropsSchema = embeddableInputSchema
  .merge(colorEnumRecord)
  .extend({
    label: z.string().optional(),
    min: z.number().default(0),
    max: z.number().default(1),
    step: z.number().default(0.1),
    initial: z.number().optional(),
    vertical: z.boolean().default(false),
    width: sizeEnumWithFull.default("medium"),
    showValue: z.boolean().default(false),
    decimals: z.number().int().default(1),
  })
  .transform((data) => {
    const firstColor = firstThemeColorValue(data);
    return {
      ...data,
      initial: data.initial ?? data.min + (data.max - data.min) / 2, // Set it to half way between max and min if it's undefined.
      color: firstColor,
      colorClasses: firstColor ? getSliderColorClasses(firstColor) : "",
    };
  });

export type EmbeddableSliderProps = z.infer<typeof sliderPropsSchema>;
