import { z } from "zod";

const MAX_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const gallerySchema = z.object({
  name: z.string().optional(),
  image: z
    .custom<File>((file) => file instanceof File, {
      message: "Image is required",
    })
    .refine((file) => file.size <= MAX_SIZE, {
      message: "Image must be 1MB or less",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only JPG, PNG or WebP allowed",
    }),
});

export type GalleryFormValues = z.infer<typeof gallerySchema>;
