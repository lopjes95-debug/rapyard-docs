import { ENV } from './env';
import crypto from 'crypto';

export const createPresignedUpload = async (opts: { contentType: string }) => {
  const key = `tracks/${crypto.randomUUID()}`;
  // Stub: in real life, sign with R2/S3 SDK
  const uploadUrl = `${ENV.R2_ENDPOINT}/${ENV.R2_BUCKET}/${key}`;
  return { key, uploadUrl };
};

export const finalizeUpload = async (opts: { key: string }) => {
  // Optionally verify existence, write DB record, etc.
  return { url: `${ENV.R2_ENDPOINT}/${ENV.R2_BUCKET}/${opts.key}` };
};
