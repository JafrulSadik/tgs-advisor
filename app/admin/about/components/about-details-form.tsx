"use client";

import { updateAbout } from "@/app/actions/about-action";
import { AboutUpdateInput } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const optionalUrlField = z
  .union([z.string().url("Invalid URL"), z.literal("")])
  .optional()
  .transform((val) => (val ? val : undefined));
export const aboutSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  facebook: optionalUrlField,
  linkedin: optionalUrlField,
  youtube: optionalUrlField,
});

export default function AboutDetailsForm({
  about,
}: {
  about?: AboutUpdateInput;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AboutUpdateInput>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      email: about?.email ?? undefined,
      phone: about?.phone ?? undefined,
      whatsapp: about?.whatsapp ?? undefined,
      address: about?.address ?? undefined,
      facebook: about?.facebook ?? undefined,
      linkedin: about?.linkedin ?? undefined,
      youtube: about?.youtube ?? undefined,
    },
  });

  const onSubmit = async (data: AboutUpdateInput) => {
    const result = await updateAbout(data);
    if (result.success) {
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 outline-none focus:border-blue-500"
            placeholder="example@domain.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 outline-none focus:border-blue-500"
            placeholder="Phone number"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            WhatsApp
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 outline-none focus:border-blue-500"
            placeholder="WhatsApp number"
            {...register("whatsapp")}
          />
          {errors.whatsapp && (
            <p className="mt-1 text-sm text-red-600">
              {errors.whatsapp.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Facebook URL
          </label>
          <input
            type="url"
            className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 outline-none focus:border-blue-500"
            placeholder="https://facebook.com/yourpage"
            {...register("facebook")}
          />
          {errors.facebook && (
            <p className="mt-1 text-sm text-red-600">
              {errors.facebook.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            LinkedIn URL
          </label>
          <input
            type="url"
            className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 outline-none focus:border-blue-500"
            placeholder="https://linkedin.com/in/yourprofile"
            {...register("linkedin")}
          />
          {errors.linkedin && (
            <p className="mt-1 text-sm text-red-600">
              {errors.linkedin.message as string}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            YouTube URL
          </label>
          <input
            type="url"
            className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 outline-none focus:border-blue-500"
            placeholder="https://youtube.com/@yourchannel"
            {...register("youtube")}
          />
          {errors.youtube && (
            <p className="mt-1 text-sm text-red-600">
              {errors.youtube.message as string}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            className="mt-1 w-full rounded-md border-2 border-gray-300 p-2 text-gray-900 outline-none focus:border-blue-500"
            rows={3}
            placeholder="Office address"
            {...register("address")}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message as string}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        <Save className="h-4 w-4" /> Save
      </button>
    </form>
  );
}
