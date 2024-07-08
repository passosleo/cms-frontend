import { config } from "../config";
import { z } from "zod";

const { isRequired, email, password } = config.messages.validations;

export const loginSchema = z.object({
  email: z
    .string({ required_error: isRequired })
    .email(email.isNotValid)
    .toLowerCase(),
  password: z.string({ required_error: isRequired }).min(8, password.min(8)),
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
