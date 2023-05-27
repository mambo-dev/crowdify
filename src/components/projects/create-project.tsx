"use client";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { toast } from "../ui/toast";
import Button from "../ui/button";
import DatePickerComponent from "../utils/date-picker";
import { TextArea } from "../ui/textarea";
import { nanoid } from "nanoid";
import UploadImage from "../utils/upload-images";
import { supabase } from "../../lib/supabase";

type Props = {
  steps: { step: number; text: string; complete: boolean }[];
  setCurrentStep: React.Dispatch<
    React.SetStateAction<{
      step: number;
      text: string;
      complete: boolean;
    }>
  >;
  setSteps: React.Dispatch<
    React.SetStateAction<
      {
        step: number;
        text: string;
        complete: boolean;
      }[]
    >
  >;
};

const CreateProject = ({ steps, setCurrentStep, setSteps }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewVideoUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(new Date());

  function handleImageUploadChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("on upload change", e);
    const selectedFile = e.target;

    if (!selectedFile.files) {
      toast({
        message: `no file chosen`,
        title: "error",
        type: "error",
      });
      return;
    }
    const file = selectedFile.files[0];

    setBanner(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleVideoUploadChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("on upload change", e);
    const selectedFile = e.target;

    if (!selectedFile.files) {
      toast({
        message: `no file chosen`,
        title: "error",
        type: "error",
      });
      return;
    }
    const file = selectedFile.files[0];

    setVideo(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
  }

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!banner || !video) {
      toast({
        message: `${!banner ? "banner is required" : "video is required"}`,
        title: "error",
        type: "error",
      });

      return;
    }
    try {
      const uploadVideo = async () => {
        try {
          const videoName = `banner-${nanoid()}-${video.name}`;
          const { data, error } = await supabase.storage
            .from("upload")
            .upload(videoName, video, {
              cacheControl: "3600",
              upsert: false,
            });

          if (error) {
            toast({
              message: error.message,
              title: "Error",
              type: "error",
            });
            return;
          }

          const { data: signedUrl } = await supabase.storage
            .from("upload")
            .createSignedUrl(`${data?.path}`, 3.156e8, {
              transform: {
                width: 100,
                height: 100,
              },
            });

          return {
            videoUrl: signedUrl,
            videoName,
          };
        } catch (error) {
          console.log(error);
          toast({
            message: "failed to upload video",
            title: "Error",
            type: "error",
          });
          return;
        }
      };

      const uploadBanner = async () => {
        const bannerName = `banner-${nanoid()}-${banner.name}`;
        const { data, error } = await supabase.storage
          .from("upload")
          .upload(bannerName, banner, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          toast({
            message: error.message,
            title: "Error",
            type: "error",
          });
          return;
        }

        const { data: signedUrl } = await supabase.storage
          .from("upload")
          .createSignedUrl(`${data?.path}`, 3.156e8, {
            transform: {
              width: 100,
              height: 100,
            },
          });

        return {
          bannerUrl: signedUrl,
          bannerName,
        };
      };

      // const filterSteps = steps.filter((step) => step.step !== 1);
      // setSteps([
      //   {
      //     step: 1,
      //     text: "Create project",
      //     complete: true,
      //   },
      //   ...filterSteps,
      // ]);
      // setCurrentStep({
      //   step: 2,
      //   text: "Add goal",
      //   complete: false,
      // });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast({
          message: error.message,
          title: "Error",
          type: "error",
        });
        return;
      }

      toast({
        message: "something went wrong, please try again ",
        title: "error",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      action=""
      onSubmit={handleSaveProject}
      className="flex flex-col py-2 border border-slate-300 rounded-md px-2 gap-3 bg-white/30"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-slate-700">title</label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="email"
            type="email"
          />
        </div>

        <DatePickerComponent
          date={deadline}
          setDate={setDeadline}
          label="deadline"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-slate-700">description</label>
        <TextArea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name="description"
        />
      </div>
      <div className="flex flex-col gap-2">
        <UploadImage
          handleFileUploadChange={handleImageUploadChange}
          label="upload banner"
          previewUrl={previewUrl}
        />
      </div>
      <div className="flex flex-col gap-2">
        <UploadImage
          handleFileUploadChange={handleVideoUploadChange}
          label="upload video"
          previewUrl={previewVideoUrl}
        />
      </div>
      <div className="flex flex-col gap-2"></div>
      <Button variant="default" size="lg" className="ml-auto">
        save project
      </Button>
    </form>
  );
};

export default CreateProject;
