import z from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(63, "Username must be at most 63 characters long")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers, and hyphens, and must start and end with a letter or number"
    )
    .refine((username) => !username.includes("--"), {
      message: "Username cannot contain consecutive hyphens",
    })
    .transform((username) => username.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
