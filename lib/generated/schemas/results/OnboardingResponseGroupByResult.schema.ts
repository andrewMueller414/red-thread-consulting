import * as z from 'zod';
export const OnboardingResponseGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  name_first: z.string(),
  name_last: z.string(),
  ctime: z.date(),
  reviewed_at: z.date(),
  _count: z.object({
    id: z.number(),
    name_first: z.number(),
    name_last: z.number(),
    ctime: z.number(),
    reviewed_at: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    name_first: z.string().nullable(),
    name_last: z.string().nullable(),
    ctime: z.date().nullable(),
    reviewed_at: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    name_first: z.string().nullable(),
    name_last: z.string().nullable(),
    ctime: z.date().nullable(),
    reviewed_at: z.date().nullable()
  }).nullable().optional()
}));