import * as z from 'zod';
import type { Prisma } from '../../prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { OnboardingResponseUpdateprioritiesInputObjectSchema as OnboardingResponseUpdateprioritiesInputObjectSchema } from './OnboardingResponseUpdateprioritiesInput.schema';
import { PriorityIdSchema } from '../enums/PriorityId.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name_first: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name_last: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  how_can_i_help: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  priorities: z.union([z.lazy(() => OnboardingResponseUpdateprioritiesInputObjectSchema), PriorityIdSchema.array()]).optional(),
  ctime: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  reviewed_at: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable()
}).strict();
export const OnboardingResponseUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.OnboardingResponseUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.OnboardingResponseUncheckedUpdateInput>;
export const OnboardingResponseUncheckedUpdateInputObjectZodSchema = makeSchema();
