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
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format (use hex like #FF5733)"),
});

export const serviceUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format")
    .optional(),
});

export const teamCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().optional(),
  company: z.string().optional(),
  education: z.string().optional(),
  specialization: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional(),
});

export const teamUpdateSchema = teamCreateSchema.partial();

export type TeamCreateInput = z.infer<typeof teamCreateSchema>;
export type TeamUpdateInput = z.infer<typeof teamUpdateSchema>;
export type ServiceCreateInput = z.infer<typeof serviceCreateSchema>;
export type ServiceUpdateInput = z.infer<typeof serviceUpdateSchema>;

export const galleryImageCreateSchema = z.object({
  name: z.string().min(1, "Image name is required"),
  image: z.string().min(1, "Image URL is required"),
});

export const galleryImageOrderSchema = z
  .array(
    z.object({
      id: z.number().int().positive(),
      sequence: z.number().int().min(1).max(8),
    }),
  )
  .refine(
    (items) =>
      new Set(items.map((item) => item.sequence)).size === items.length,
    {
      message: "Sequences must be unique",
    },
  );

export type GalleryImageCreateInput = z.infer<typeof galleryImageCreateSchema>;
export type GalleryImageOrderInput = z.infer<typeof galleryImageOrderSchema>;

export const aboutUpdateSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  facebook: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().url("Invalid URL").optional(),
  ),
  linkedin: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().url("Invalid URL").optional(),
  ),
  youtube: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().url("Invalid URL").optional(),
  ),
});

// Infer type automatically
export type AboutUpdateInput = z.infer<typeof aboutUpdateSchema>;

// Certification Schemas
export const certificationCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  image: z.string().min(1, "Image filename is required"),
});

export const certificationUpdateSchema = certificationCreateSchema.partial();

export type CertificationCreateInput = z.infer<
  typeof certificationCreateSchema
>;
export type CertificationUpdateInput = z.infer<
  typeof certificationUpdateSchema
>;

export const testimonialCreateSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  clientDesignation: z.string().optional(),
  clientCompany: z.string().optional(),
  review: z.string().min(1, "Review is required"),
  clientImage: z.string().optional(),
});

export const testimonialUpdateSchema = testimonialCreateSchema.partial();

export type TestimonialCreateInput = z.infer<typeof testimonialCreateSchema>;
export type TestimonialUpdateInput = z.infer<typeof testimonialUpdateSchema>;
