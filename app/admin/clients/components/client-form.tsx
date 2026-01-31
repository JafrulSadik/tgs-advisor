"use client";

import { createClient, updateClient } from "@/app/actions/client-action";
import { clientCreateSchema, type ClientCreateInput } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RichTextEditor } from "../../components/rich-text-editor";

type ClientFormProps = {
  client?: ClientCreateInput;
};

export function ClientForm({ client }: ClientFormProps) {
  const router = useRouter();
  const { id } = useParams();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ClientCreateInput>({
    resolver: zodResolver(clientCreateSchema),
    defaultValues: {
      title: client ? client.title : "",
      description: client ? client.description : "",
    },
  });

  const onSubmit = async (data: ClientCreateInput) => {
    setServerError(null);

    let result;

    if (id) {
      result = await updateClient(Number(id), data);
    } else {
      result = await createClient(data);
    }

    if (result.error) {
      setServerError(result.error);
      return;
    }

    if (result.success) {
      router.push("/admin/clients");
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6  p-8 rounded-xl shadow-sm bg-linear-to-br bg-[#fff]"
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
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          placeholder="Client Title"
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
          Description <span className="text-red-500">*</span>
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              placeholder="Enter client description..."
            />
          )}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800/80 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {id && (isSubmitting ? "Updating..." : "Update Client")}
          {!id && (isSubmitting ? "Creating..." : "Create Client")}
        </button>
      </div>
    </form>
  );
}
