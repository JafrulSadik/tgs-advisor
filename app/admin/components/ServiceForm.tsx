"use client";

import { serviceCreateSchema, type ServiceCreateInput } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { RichTextEditor } from "./RichTextEditor";

interface ServiceFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function ServiceForm({ onClose, onSuccess }: ServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ServiceCreateInput>({
    resolver: zodResolver(serviceCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      pointsTitle: "Key Focus Area",
      points: [""],
      outcome: "",
      color: "#00BDF2",
      button: "Request Advisory Session",
      tag: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "points" as never,
  });

  const description = watch("description");

  const onSubmit = async (data: ServiceCreateInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to create service");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-generate tag from title
  const generateTag = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Service</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", {
                  onChange: (e) => {
                    const tag = generateTag(e.target.value);
                    setValue("tag", tag);
                  },
                })}
                type="text"
                placeholder="e.g., Production & Efficiency Development"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description (Rich Text) */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={description}
                onChange={(value) => setValue("description", value)}
                placeholder="Enter service description..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Points Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Points Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("pointsTitle")}
                type="text"
                placeholder="e.g., Key Focus Area"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {errors.pointsTitle && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.pointsTitle.message}
                </p>
              )}
            </div>

            {/* Points Array */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Points <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <input
                      {...register(`points.${index}`)}
                      type="text"
                      placeholder={`Point ${index + 1}`}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="rounded-lg p-3 text-red-500 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => append("")}
                className="mt-3 flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Point
              </button>
              {errors.points && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.points.message}
                </p>
              )}
            </div>

            {/* Outcome */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Outcome <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("outcome")}
                rows={3}
                placeholder="e.g., Higher output, reduced loss and consistent performance improvement."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
              />
              {errors.outcome && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.outcome.message}
                </p>
              )}
            </div>

            {/* Color & Button Row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Color */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Theme Color <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    {...register("color")}
                    type="color"
                    className="h-12 w-12 cursor-pointer rounded-lg border border-gray-300"
                  />
                  <input
                    {...register("color")}
                    type="text"
                    placeholder="#00BDF2"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                {errors.color && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.color.message}
                  </p>
                )}
              </div>

              {/* Button Text */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Button Text <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("button")}
                  type="text"
                  placeholder="e.g., Request Advisory Session"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                {errors.button && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.button.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tag (URL Slug) */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                URL Tag <span className="text-red-500">*</span>
              </label>
              <input
                {...register("tag")}
                type="text"
                placeholder="e.g., production-efficiency-development"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <p className="mt-1 text-xs text-gray-500">
                Auto-generated from title. Use lowercase letters, numbers, and
                hyphens only.
              </p>
              {errors.tag && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.tag.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
              {isSubmitting ? "Creating..." : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
