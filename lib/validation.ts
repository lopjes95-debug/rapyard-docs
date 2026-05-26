import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterSchema = z.object({
  handle: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string().min(8),
});

export const UploadTrackSchema = z.object({
  title: z.string().min(1).max(120),
  fileKey: z.string().min(1), // from presigned upload
  durationSec: z.number().int().positive(),
});

export const BattleCreateSchema = z.object({
  trackAId: z.string(),
  trackBId: z.string(),
});

export const FeedQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
