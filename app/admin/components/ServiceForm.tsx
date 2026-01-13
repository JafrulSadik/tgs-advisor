"use client";

import { createService, updateService } from "@/app/actions/service-action";
import { serviceCreateSchema, type ServiceCreateInput } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RichTextEditor } from "./RichTextEditor";

type ServiceFormProps = {
  service?: ServiceCreateInput;
};

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const { id } = useParams();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ServiceCreateInput>({
    resolver: zodResolver(serviceCreateSchema),
    defaultValues: {
      title: service ? service.title : "",
      description: service ? service.description : "",
      color: service ? service.color : "#00BDF2",
    },
  });

  const onSubmit = async (data: ServiceCreateInput) => {
    setServerError(null);

    let result;

    if (id) {
      result = await updateService(Number(id), data);
    } else {
      result = await createService(data);
    }

    if (result.error) {
      setServerError(result.error);
      return;
    }

    if (result.success) {
      router.push("/admin/services");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6  p-6 rounded-lg shadow-sm bg-linear-to-br bg-[#fff]"
    >
      {serverError && (
        <div className="p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">
          {serverError}
        </div>
      )}
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          placeholder="Service Title"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder-slate-400"
        />

        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-slate-900 mb-2"
        >
          Description
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              placeholder="Enter service description..."
            />
          )}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700"
        >
          Color
        </label>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={watch("color")}
              onChange={(e) => setValue("color", e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />

            <div
              className="size-10 w-16 rounded-lg border-2 border-slate-300 shadow-sm"
              style={{ backgroundColor: watch("color") }}
            />
          </div>

          {/* Hex Input */}
          <input
            type="text"
            {...register("color")}
            placeholder="#000000"
            className="
        h-10 w-32 rounded-lg
        border border-gray-300
        bg-white px-3 text-sm uppercase
        shadow-sm
        transition
        focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200
      "
          />
        </div>

        {errors.color && (
          <p className="text-xs text-red-500">{errors.color.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800/80 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {id && (isSubmitting ? "Updating..." : "Update Service")}
          {!id && (isSubmitting ? "Creating..." : "Create Service")}
        </button>
      </div>
    </form>
  );
}
