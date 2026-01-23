import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const onboardingresponsescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => OnboardingResponseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OnboardingResponseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OnboardingResponseScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OnboardingResponseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OnboardingResponseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  name_first: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name_last: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  how_can_i_help: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  ctime: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  reviewed_at: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const OnboardingResponseScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.OnboardingResponseScalarWhereWithAggregatesInput> = onboardingresponsescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.OnboardingResponseScalarWhereWithAggregatesInput>;
export const OnboardingResponseScalarWhereWithAggregatesInputObjectZodSchema = onboardingresponsescalarwherewithaggregatesinputSchema;
