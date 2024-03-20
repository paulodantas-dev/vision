import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .min(5, "Email must contain at least 5 character(s)")
    .email("Email must be valid"),
  password: z.string().min(6, "Password must contain at least 6 character(s)"),
});
