import * as z from 'zod';
export const OnboardingResponseFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  name_first: z.string(),
  name_last: z.string(),
  how_can_i_help: z.string(),
  priorities: z.array(z.unknown()),
  ctime: z.date(),
  reviewed_at: z.date().optional()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});