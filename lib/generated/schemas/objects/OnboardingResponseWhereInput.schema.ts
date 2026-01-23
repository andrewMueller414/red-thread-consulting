import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumPriorityIdNullableListFilterObjectSchema as EnumPriorityIdNullableListFilterObjectSchema } from './EnumPriorityIdNullableListFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const onboardingresponsewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OnboardingResponseWhereInputObjectSchema), z.lazy(() => OnboardingResponseWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OnboardingResponseWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OnboardingResponseWhereInputObjectSchema), z.lazy(() => OnboardingResponseWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name_first: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name_last: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  how_can_i_help: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  priorities: z.lazy(() => EnumPriorityIdNullableListFilterObjectSchema).optional(),
  ctime: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  reviewed_at: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const OnboardingResponseWhereInputObjectSchema: z.ZodType<Prisma.OnboardingResponseWhereInput> = onboardingresponsewhereinputSchema as unknown as z.ZodType<Prisma.OnboardingResponseWhereInput>;
export const OnboardingResponseWhereInputObjectZodSchema = onboardingresponsewhereinputSchema;
