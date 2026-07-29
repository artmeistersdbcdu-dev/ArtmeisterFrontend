"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { createEvent, getEventById, updateEvent } from "@/service/event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/schema/event";
import { upload } from "@/service/upload";
import { toast } from "sonner";
import { useAuthStore } from "@/store/user";
import { canModerate } from "@/lib/roles";
import CropModal from "@/components/CropModal";

const ImageInput = ({ label, inputRef, existingImage, onFileChange, cropShape }) => {
  const [preview, setPreview] = useState(null);
  const [cropFile, setCropFile] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCropFile(file);
    setShowCrop(true);
  };

  const handleCropComplete = (blob) => {
    const file = cropFile;
    const croppedFile = new File([blob], file.name, { type: "image/jpeg" });

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(croppedFile);
    setPreview(url);
    setShowCrop(false);
    setCropFile(null);

    onFileChange?.(croppedFile);
  };

  const handleCancelCrop = () => {
    setShowCrop(false);
    setCropFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
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

  const isRound = cropShape === "round";

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

      <CropModal
        open={showCrop}
        image={cropFile ? URL.createObjectURL(cropFile) : undefined}
        cropShape={cropShape ?? "rect"}
        aspect={isRound ? 1 : 16 / 9}
        onCropComplete={handleCropComplete}
        onCancel={handleCancelCrop}
      />

      {preview ? (
        <div className={`relative ${isRound ? 'flex justify-center' : 'w-full'}`}>
          {isRound ? (
            <div className="relative group">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-overlay/10 mx-auto">
                <img src={preview} className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => inputRef.current?.click()} className="text-xs bg-black/60 text-white px-2 py-1 rounded">
                  Change
                </button>
                <button type="button" onClick={handleRemove} className="text-xs bg-black/60 text-white px-2 py-1 rounded">
                  Remove
                </button>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className={`${isRound ? 'w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto' : 'w-full rounded-xl'} bg-overlay/5 border border-overlay/10 border-dashed px-4 py-6 text-center cursor-pointer flex items-center justify-center`}
        >
          <p className="text-content/40 text-sm">Click to upload image</p>
        </div>
      )}
    </div>
  );
};

const CreateEventPage = ({ id }) => {
  const user = useAuthStore((state) => state.user);
  const [isBanned, setIsBanned] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const [bioTab, setBioTab] = useState("write");
  const router = useRouter();
  useEffect(() => {
    if (!user) return;
    if (!canModerate(user)) {
      router.push("/");
    }
    if (user.Status === "banned") {
      setIsBanned(true);
    }
  }, [user]);
  const logoRef = useRef(null);
  const bannerRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
  });
  const descriptionValue = watch("description");
  const eventId = id;
  const {
    data: createdEvent,
    fn: createEventFn,
    loading: creatingEvent,
  } = useFetch(createEvent);
  const {
    data: Event,
    fn: getEventFn,
    loading: gettingEvent,
  } = useFetch(getEventById);
  const {
    data: updatedEvent,
    fn: updateEventFn,
    loading: updatingEvent,
  } = useFetch(updateEvent);

  const isEdit = !!eventId;

  const handleOnSubmit = async (data) => {
    if (isEdit) {
      const payload = {};
      let image = "";
      let bannerImage = "";
      try {
        if (logoFile) {
          const logoImgRes = await upload(logoFile);
          if (!logoImgRes?.success) {
            toast.error("Image upload error");
            return;
          }
          image = logoImgRes?.url;
        }

        if (bannerFile) {
          const bannerImgRes = await upload(bannerFile);
          if (!bannerImgRes?.success) {
            toast.error("Image upload error");
            return;
          }
          bannerImage = bannerImgRes?.url;
        }
        payload.name =
          data.name?.trim() !== (Event?.Data?.Name ?? "").trim()
            ? data.name.trim()
            : null;
        payload.description =
          data.description?.trim() !==
          (Event?.Data?.Description?.String ?? "").trim()
            ? data.description.trim()
            : null;
        payload.date =
          data.date?.trim() !== (Event?.Data?.EventDate ?? "").trim()
            ? data.date.trim()
            : null;
        payload.status =
          data.status?.trim() !== (Event?.Data?.Status ?? "").trim()
            ? data.status.trim()
            : null;
        payload.venue =
          data.venue?.trim() !== (Event?.Data?.Venue?.String ?? "").trim()
            ? data.venue.trim()
            : null;
        payload.image = image || null;
        payload.bannerImage = bannerImage || null;
        if (Object.values(payload).some((v) => v !== null)) {
          updateEventFn(eventId, payload);
        }
        return;
      } catch {
        toast.error("Image size should be less than 5 MB");
      }
    }
    let logoUrl = "";
    let bannerUrl = "";
    if (bannerFile) {
      const res = await upload(bannerFile);
      if (!res?.success) {
        toast.error("Image Size Should be less than 5 MB");
        return;
      }
      bannerUrl = res?.url;
    }
    if (logoFile) {
      const res = await upload(logoFile);
      if (!res?.success) {
        toast.error("Image Size Should be less than 5 MB");
        return;
      }
      logoUrl = res?.url;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("venue", data.venue);
    formData.append("status", data.status);
    formData.append("date", data.date);
    formData.append("LogoUrl", logoUrl);
    formData.append("bannerUrl", bannerUrl);
    createEventFn(formData);
  };
  useEffect(() => {
    if (updatedEvent) {
      toast.success("Event updated Successfully");
      router.push(`/event/${updatedEvent.Data.ID}`);
    }
  }, [updatedEvent]);
  useEffect(() => {
    if (createdEvent) {
      toast.success("Event created successfully");
      router.push(`/event/${createdEvent.Data.ID}`);
    }
  }, [createdEvent]);
  useEffect(() => {
    if (Event?.Success) {
      const eventDetails = Event?.Data;

      reset({
        name: eventDetails?.Name ?? "",
        description: eventDetails?.Description?.String ?? "",
        venue: eventDetails?.Venue?.String ?? "",
        status: eventDetails?.Status ?? "",
        date: eventDetails?.EventDate
          ? eventDetails.EventDate.split("T")[0]
          : "",
      });
      setBannerFile(null);
      setLogoFile(null);
    }
  }, [Event, reset]);
  useEffect(() => {
    if (!isEdit) return;
    getEventFn(eventId);
  }, [isEdit]);
  return (
    <section>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-gradient mb-2">
          {isEdit ? "Edit Event" : "Create Event"}
        </h1>
        <p className="text-content/60">
          Organize and share your event with the community.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(handleOnSubmit)}>
        {/* Event Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-content/80">
            Event Name
          </label>
          <input
            type="text"
            placeholder="Art Exhibition 2026"
            {...register("name")}
            className="w-full bg-overlay/5 border border-overlay/10 rounded-xl px-4 py-3"
          />
          {errors.name?.message && (
            <p className="text-red-800/50 text-sm">{errors.name?.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-content/80">
            Description
          </label>

          <div className="flex gap-1 p-1 bg-overlay/5 border border-overlay/10 rounded-t-xl">
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
          </div>

          {bioTab === "write" ? (
            <textarea
              {...register("description")}
              rows={14}
              placeholder="Tell people about your event...&#10;&#10;You can use **markdown** for formatting:&#10;- Lists&#10;- *Italic* and **bold**&#10;- [Links](url)&#10;- Headers&#10;- And more!"
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

          {errors.description?.message && (
            <p className="text-red-800/50 text-sm">
              {errors.description?.message}
            </p>
          )}
        </div>

        {/* Venue */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-content/80">Venue</label>
          <input
            {...register("venue")}
            type="text"
            placeholder="Delhi Convention Centre"
            className="w-full bg-overlay/5 border border-overlay/10 rounded-xl px-4 py-3"
          />
          {errors.venue?.message && (
            <p className="text-red-800/50 text-sm">{errors.venue?.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-content/80">Status</label>
          <select
            {...register("status")}
            className="w-full bg-overlay/5 border border-overlay/10 rounded-xl px-4 py-3"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Event Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-content/80">
            Event Date
          </label>
          <input
            type="date"
            {...register("date")}
            className="w-full bg-overlay/5 border border-overlay/10 rounded-xl px-4 py-3"
          />
          {errors.date?.message && (
            <p className="text-red-800/50 text-sm">{errors.date?.message}</p>
          )}
        </div>

        <ImageInput
          label="Event Logo"
          onFileChange={setLogoFile}
          inputRef={logoRef}
          cropShape="round"
          existingImage={Event?.Data?.Image?.String}
        />

        <ImageInput
          label="Event Banner"
          onFileChange={setBannerFile}
          inputRef={bannerRef}
          existingImage={Event?.Data?.BannerImage?.String}
        />

        <button
          type="submit"

          disabled={creatingEvent || isBanned}
          className="w-full bg-red-800 hover:bg-red-700 disabled:bg-red-800/50 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {creatingEvent ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </section>
  );
};

export default CreateEventPage;
