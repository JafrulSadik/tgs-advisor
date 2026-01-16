"use client";

import {
  deleteGalleryImage,
  updateGalleryOrder,
} from "@/app/actions/gallery-action";
import Modal from "@/app/components/modal";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import SortableCard from "./shortable-card";

export type GalleryImage = {
  id: number;
  name: string;
  image: string;
  sequence: number;
};

interface GalleryBoardProps {
  initialImages: GalleryImage[];
  limit: number;
}

export function GalleryBoard({ initialImages, limit }: GalleryBoardProps) {
  const [items, setItems] = useState<GalleryImage[]>(initialImages);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setItems(initialImages);
  }, [initialImages]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      if (!over || active.id === over.id) return;

      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return prev;

        const fallback = prev.map((item) => ({ ...item }));
        const reordered = arrayMove(prev, oldIndex, newIndex).map(
          (item, index) => ({
            ...item,
            sequence: index + 1,
          })
        );

        startTransition(async () => {
          const orderPayload = reordered.map(({ id, sequence }) => ({
            id,
            sequence,
          }));
          const result = await updateGalleryOrder(orderPayload);
          if (result?.error) {
            console.log({ error });
            setError(result.error);
            setItems(fallback);
          } else {
            router.refresh();
          }
        });

        return reordered;
      });
    },
    [router, startTransition, error]
  );

  const deleteImageAsset = async (filenameOrUrl?: string) => {
    if (!filenameOrUrl) return;
    const target = filenameOrUrl.split("/").pop();
    const query = target
      ? `filename=${encodeURIComponent(target)}`
      : `url=${encodeURIComponent(filenameOrUrl)}`;
    await fetch(`/api/uploads/gallery?${query}`, { method: "DELETE" });
  };

  const handleDelete = useCallback(
    async (image: GalleryImage) => {
      setDeletingId(image.id);
      setError(null);
      const result = await deleteGalleryImage(image.id);
      if (result?.error) {
        setError(result.error);
        setDeletingId(null);
        return;
      }

      await deleteImageAsset(image.image);
      setItems((prev) =>
        prev
          .filter((item) => item.id !== image.id)
          .map((item, index) => ({ ...item, sequence: index + 1 }))
      );
      setDeletingId(null);
      router.refresh();
    },
    [router]
  );

  const selectedImage = useMemo(() => {
    if (selectedImageId === null) return null;
    return items.find((item) => item.id === selectedImageId) ?? null;
  }, [items, selectedImageId]);

  const remainingSlots = useMemo(
    () => limit - items.length,
    [items.length, limit]
  );

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-lg font-semibold text-slate-900">No images yet</p>
        <p className="mt-2 text-sm text-slate-500">
          Upload up to {limit} images to curate the gallery.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          Drag cards to reorder. Remaining slots: {remainingSlots}
        </p>
        {isPending && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Saving order...
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={(event) => setActiveId(Number(event.active.id))}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((image) => (
              <SortableCard
                key={image.id}
                image={image}
                isActive={activeId === image.id}
                onDelete={handleDelete}
                deleting={deletingId === image.id}
                showDeleteModal={showModal}
                setShowDeleteModal={setShowModal}
                setSelectedImage={setSelectedImageId}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {showModal && selectedImage && (
        <Modal
          isDeleting={deletingId === selectedImage.id}
          handleDelete={() => {
            setShowModal(false);
            setSelectedImageId(null);
            void handleDelete(selectedImage);
          }}
          setShowModal={setShowModal}
          onCancel={() => {
            setSelectedImageId(null);
          }}
        />
      )}
    </div>
  );
}
