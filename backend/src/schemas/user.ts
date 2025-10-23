import { z } from "zod";

const userSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(50, "Email must be less than 50 characters"),

  firstName: z
    .string({ required_error: "First name is required" })
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),

  lastName: z
    .string({ required_error: "Last name is required" })
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),

  avatarUrl: z.string().url("Please enter a valid URL").optional(),
});

export { userSchema };
export type User = z.infer<typeof userSchema>;
