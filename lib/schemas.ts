import { z } from "zod";

export const userCreateSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
});

export const userUpdateSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  name: z.string().optional(),
});

// Service Schemas
export const serviceCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  pointsTitle: z.string().min(1, "Points title is required"),
  points: z.array(z.string()).min(1, "At least one point is required"),
  outcome: z.string().min(1, "Outcome is required"),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format (use hex like #FF5733)"),
  button: z.string().min(1, "Button text is required"),
  tag: z
    .string()
    .min(1, "Tag is required")
    .regex(/^[a-z0-9-]+$/, "Tag must be lowercase with hyphens only"),
});

export const serviceUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  pointsTitle: z.string().min(1, "Points title is required").optional(),
  points: z
    .array(z.string())
    .min(1, "At least one point is required")
    .optional(),
  outcome: z.string().min(1, "Outcome is required").optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format")
    .optional(),
  button: z.string().min(1, "Button text is required").optional(),
  tag: z
    .string()
    .min(1, "Tag is required")
    .regex(/^[a-z0-9-]+$/, "Tag must be lowercase with hyphens only")
    .optional(),
});

export type ServiceCreateInput = z.infer<typeof serviceCreateSchema>;
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;
