"use client";
import { ArrowRight, Check, Upload, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import { createArt, getArtById, updateArt } from "@/service/art";
import { zodResolver } from "@hookform/resolvers/zod";
import { artworkSchema } from "@/schema/art";
import { toast } from "sonner";
import { upload } from "@/service/upload";
import { useAuthStore } from "@/store/user";

import { useRouter } from "next/navigation";

const categories = [
  { value: "digital-art", label: "Digital Art" },
  { value: "photography", label: "Photography" },
  { value: "illustration", label: "Illustration" },
  { value: "painting", label: "Painting" },
  { value: "3d", label: "3D Art" },
];
const CreateArt = ({ artid }) => {
  const [artData, setArtData] = useState(null);
  const id = artid
  console.log(id);
  
  const isEdit = Boolean(id);
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(artworkSchema),
  });

  const user = useAuthStore((state) => state.user);
  const [isBanned, setIsBanned] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const {
    fn: getArtFn,
    loading: getArtLoading,
    data: artDataRes,
  } = useFetch(getArtById);
  const {
    fn: createArtFunc,
    data: createdArt,
    loading: createLoading,
  } = useFetch(createArt);
  const {
    fn: updateArtFunc,
    data: updatedArt,
    loading: updateLoading,
  } = useFetch(updateArt);

  useEffect(() => {
    setIsBanned(user?.Status !== "approved");
  }, [user]);

  useEffect(() => {
    if (!id) return;
    getArtFn(id);
  }, [id]);

  useEffect(() => {
    if (!artDataRes?.Success) return;
    const art = artDataRes.Data;
    setArtData(art);
    reset({
      name: art.Name || "",
      description: art.Description?.String || "",
    });
    setSelectedCategories(art.Tags || []);
    setPreview(art.Image || null);
    setFile(null);
  }, [artDataRes, reset]);

  useEffect(() => {
    if (!createdArt) return;
    toast.success("Artwork created successfully");
    reset();
    router.push(`/u/${user?.ID}/${createdArt?.Data?.ID}`);
  }, [createdArt, reset]);
  useEffect(() => {
    if (!updatedArt) return;
    toast.success("Artwork updated successfully");
    reset();
    router.push(`/u/${user?.ID}/${updatedArt?.Data?.ID}`);
  }, [updatedArt, reset]);

  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleOnSubmit = async (data) => {
    try {
      if (isBanned) {
        toast.error("You are banned, can't upload");
        return;
      }

      if (!isEdit) {
        let url = preview;
        if (file) {
          const res = await upload(file);
          if (!res?.success) {
            throw new Error("Image upload error");
          }
          url = res?.url || "";
        }
        const payload = {
          name: data.name,
          description: data.description,
          url,
          tags: selectedCategories,
        };

        createArtFunc(payload);
      } else {
        const payload = {};
        payload.name =
          data.name?.trim() !== (artData?.Name ?? "").trim()
            ? data.title.trim()
            : null;
        payload.description =
          data.description?.trim() !==
          (artData?.Description?.String ?? "").trim()
            ? data.description.trim()
            : null;
        const originalTags = artData?.Tags ?? [];
        const newTags = selectedCategories ?? [];
        const tagsChanged =
          newTags.length !== originalTags.length ||
          newTags.some((t) => !originalTags.includes(t));
        payload.tags = tagsChanged ? newTags.filter(Boolean) : null;
        if (Object.values(payload).some((v) => v !== null)) {
          updateArtFunc(id, payload);
        }
      }
    } catch (err) {
      toast.error("Image size should be less than 5 MB");
    }
  };
  return (
    <div>
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow/10 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="auth-card w-full max-w-2xl bg-overlay/5 backdrop-blur-xl border border-overlay/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-gradient mb-2">
              {isEdit ? "Edit Art" : "Upload Art"}
            </h1>
            <p className="text-content/60">
              Share your creativity with the world.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleOnSubmit)}>
            {/* Upload Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-content/80">
                Artwork Image
              </label>

              {preview ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-overlay/10">
                  <img
                    src={preview}
                    alt="Artwork preview"
                    className="w-full h-64 object-cover"
                  />
                  {!isEdit && (
                    <button
                      type="button"
                      onClick={handleRemove}
                      className="absolute top-2 right-2 bg-frosty/60 hover:bg-frosty/80 text-content rounded-full p-1.5 transition-all"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-overlay/10 rounded-2xl p-10 cursor-pointer hover:border-red-800/40 transition-all">
                  <Upload size={40} className="text-content/40 mb-3" />
                  <span className="text-content/70 font-medium">
                    Click to upload artwork
                  </span>
                  <span className="text-content/30 text-sm mt-1">
                    PNG, JPG, WEBP
                  </span>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              )}
            </div>
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-content/80">
                Artwork Title
              </label>
              <input
                type="text"
                placeholder="Sunset Dreams"
                {...register("name")}
                className="w-full bg-overlay/5 border border-overlay/10 rounded-xl px-4 py-3 outline-none focus:border-red-800/50 focus:bg-overlay/10 transition-all text-content placeholder:text-content/20"
              />
              {errors.name?.message && (
                <p className="text-red-800/50 text-sm">
                  {errors.name?.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-content/80">
                Category
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full min-h-12 h-auto justify-start flex-wrap"
                  >
                    {selectedCategories?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((value) => {
                          const category = categories.find(
                            (c) => c.value === value,
                          );
                          return (
                            <Badge
                              key={value}
                              className="flex items-center gap-1"
                            >
                              {category?.label}
                            </Badge>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">
                        Select Categories
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search categories..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.value}
                            onSelect={() => toggleCategory(category.value)}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                selectedCategories?.includes(category.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-content/80">
                Description
              </label>
              <textarea
                rows={5}
                placeholder="Tell viewers about your artwork..."
                {...register("description")}
                className="w-full bg-overlay/5 border border-overlay/10 rounded-xl px-4 py-3 outline-none focus:border-red-800/50 focus:bg-overlay/10 transition-all text-content placeholder:text-content/20 resize-none"
              />
              {errors.description?.message && (
                <p className="text-red-800/50 text-sm">
                  {errors.description?.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isBanned || createLoading || updateLoading}
              className="w-full bg-red-800 hover:bg-red-700 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:shadow-none text-content font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 group"
            >
              {createLoading || updateLoading ? (
                <>
                  <div className="size-4 border-2 border-overlay/30 border-t-content rounded-full animate-spin" />
                  {isEdit ? "Updating..." : "Uploading..."}
                </>
              ) : isBanned ? (
                <>Your Account Is Halted</>
              ) : isEdit ? (
                <>Update Artwork</>
              ) : (
                <>Upload Artwork</>
              )}

              {!createLoading && !updateLoading && (
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArt;
