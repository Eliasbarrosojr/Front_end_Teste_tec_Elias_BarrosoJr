import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export type FormData = z.infer<typeof schema>;
