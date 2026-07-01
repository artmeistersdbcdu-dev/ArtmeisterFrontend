"use client";
import useFetch from "@/hooks/useFetch";
import { onBoardingSchema } from "@/schema/user";
import { upload, uploadDummy } from "@/service/upload";
import { updateUser } from "@/service/user";
import { useAuthStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const ImageInput = ({ label, inputRef, existingImage, onFileChange }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    onFileChange?.(file);
  };
  const handleRemove = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onFileChange?.(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-content/80">{label}</label>

      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative w-full rounded-xl overflow-hidden border border-overlay/10">
          <img src={preview} className="w-full max-h-48 object-cover" />

          <div className="absolute top-2 right-2 flex gap-2">
            <button type="button" onClick={() => inputRef.current?.click()}>
              Change
            </button>

            <button type="button" onClick={handleRemove}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full bg-overlay/5 border border-overlay/10 border-dashed rounded-xl px-4 py-6 text-center cursor-pointer"
        >
          <p className="text-content/40 text-sm">Click to upload image</p>
        </div>
      )}
    </div>
  );
};

const onboarding = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [bioTab, setBioTab] = useState("write");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onBoardingSchema),
    defaultValues: {
      username: "",
      description: "",
      batch: "",
      instagram: "",
      youtube: "",
    },
  });

  const descriptionValue = watch("description");

  useEffect(() => {
    if (user) {
      const editing = user?.Username?.Valid;
      setIsEdit(editing);

      reset({
        username: user?.Username?.String || "",
        description: user?.Description?.String || "",
        batch: user?.Batch?.String || "",
        instagram: user?.SocialLinks?.instagram || "",
        youtube: user?.SocialLinks?.youtube || "",
      });
    }
  }, [user, reset]);

  const {
    data: updatedUser,
    fn: onboardUser,
    loading: updating,
  } = useFetch(updateUser);

  const handleOnSubmit = async (data) => {
    try {
      let image = "";
      let bannerImage = "";
      if (logoRef?.current?.files?.[0]) {
        const logoImgRes = await upload(logoRef.current.files[0]);
        image = logoImgRes?.url;
      }

      if (bannerRef?.current?.files?.[0]) {
        const bannerImgRes = await upload(bannerRef.current.files[0]);
        bannerImage = bannerImgRes?.url;
      }

      const payload = {
        username: data.username || null,
        description: data.description || null,
        batch: data.batch || null,
        image: image || null,
        banner_image: bannerImage || null,
        social:
          data.instagram || data.youtube
            ? {
                instagram: data.instagram || "",
                youtube: data.youtube || "",
              }
            : null,
      };

      onboardUser(user?.ID, payload);
    } catch (error) {
      console.log(error);
      toast.error("Image size should be less than 5 MB");
    }
  };

  useEffect(() => {
    if (!updating && updatedUser) {
      setUser(updatedUser?.Data);
      router.push(`/u/${updatedUser?.Data?.ID}`);
    }
  }, [updatedUser, updating, router, setUser]);

  const logoRef = useRef(null);
  const bannerRef = useRef(null);
  return (
    <div className="min-h-screen bg-frosty text-content flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl glass rounded-3xl border border-overlay/10 p-8 md:p-12 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif text-gradient mb-3">
            {isEdit ? "Edit Your Profile" : "Complete Your Profile"}
          </h2>

          <p className="text-content/60 text-lg">
            {isEdit
              ? "Update your identity and keep your creative journey fresh."
              : "Set up your identity and let the community know who you are."}
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(handleOnSubmit)}>
          {/* Profile Images */}
          <div className="grid md:grid-cols-2 gap-6">
            <ImageInput
              label="Profile Picture"
              inputRef={logoRef}
              
              existingImage={isEdit ? user?.Image?.String : ""}
              onFileChange={setLogoFile}
            />

            <ImageInput
              label="Banner Image"
              inputRef={bannerRef}
              existingImage={isEdit ? user?.BannerImage?.String : ""}
              onFileChange={setBannerFile}
            />
          </div>
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-content/80">
              Username
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-content/40">
                @
              </span>

              <input
                type="text"
                {...register("username")}
                placeholder="blueonion"
                className="w-full pl-8 bg-overlay/5 border border-overlay/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-all"
              />
            </div>

            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Batch */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-content/80">
              Batch / Year
            </label>

            <input
              type="text"
              {...register("batch")}
              placeholder="2026"
              className="w-full bg-overlay/5 border border-overlay/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-all"
            />

            {errors.batch && (
              <p className="text-red-500 text-sm">{errors.batch.message}</p>
            )}
          </div>

          {/* Social Links */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-content/80">
                Instagram
              </label>

              <input
                type="url"
                {...register("instagram")}
                placeholder="https://instagram.com/yourname"
                className="w-full bg-overlay/5 border border-overlay/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-content/80">
                YouTube
              </label>

              <input
                type="url"
                {...register("youtube")}
                placeholder="https://youtube.com/@yourchannel"
                className="w-full bg-overlay/5 border border-overlay/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-content/80">Bio</label>

            <div className="flex gap-1 p-1 bg-overlay/5 border border-overlay/10 rounded-t-xl">
              <button
                type="button"
                onClick={() => setBioTab("preview")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  bioTab === "preview"
                    ? "bg-overlay/10 text-content"
                    : "text-content/50 hover:text-content/80"
                }`}
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setBioTab("write")}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  bioTab === "write"
                    ? "bg-overlay/10 text-content"
                    : "text-content/50 hover:text-content/80"
                }`}
              >
                Write
              </button>
            </div>

            {bioTab === "write" ? (
              <textarea
                rows={14}
                {...register("description")}
                placeholder="Tell the world about your art, style, or creative journey...&#10;&#10;You can use **markdown** for formatting:&#10;- Lists&#10;- *Italic* and **bold**&#10;- [Links](url)&#10;- Headers&#10;- And more!"
                className="w-full bg-overlay/5 border-x border-b border-overlay/10 rounded-b-xl px-4 py-3 resize-none focus:outline-none focus:border-accent transition-all"
              />
            ) : (
              <div className="w-full min-h-[336px] bg-overlay/5 border-x border-b border-overlay/10 rounded-b-xl px-4 py-3 markdown-content">
                {descriptionValue?.trim() ? (
                  <ReactMarkdown>{descriptionValue}</ReactMarkdown>
                ) : (
                  <p className="text-content/40">Nothing to preview yet.</p>
                )}
              </div>
            )}

            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={updating}
            className="w-full bg-red-800 hover:opacity-90 disabled:opacity-50 text-content font-bold py-4 rounded-xl transition-all"
          >
            {updating
              ? isEdit
                ? "Saving Changes..."
                : "Completing Profile..."
              : isEdit
                ? "Save Changes"
                : "Complete Onboarding"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default onboarding;
