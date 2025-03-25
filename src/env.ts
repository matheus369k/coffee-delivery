import z from 'zod';

const envSchema = z.object({
  VITE_RENDER_API_URL: z.string().url(),
  VITE_GH_API_URL: z
    .string()
    .url()
    .default(
      'https://raw.githubusercontent.com/matheus369k/coffee-delivery-api/refs/heads/main/db.json',
    ),
});

export const env = envSchema.parse(import.meta.env);
