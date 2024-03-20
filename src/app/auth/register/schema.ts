import { z } from "zod";

export const formSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "First name must contain at least 3 character(s)"),
    lastName: z
      .string()
      .min(3, "Last name must contain at least 3 character(s)"),
    email: z
      .string()
      .min(5, "Email must contain at least 5 character(s)")
      .email("Email must be valid"),
    password: z
      .string()
      .min(6, "Password must contain at least 6 character(s)"),
    confirmPassword: z
      .string()
      .min(6, "Password must contain at least 6 character(s)"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
