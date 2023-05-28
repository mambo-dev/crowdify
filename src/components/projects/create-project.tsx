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
import createProject from "../../app/helpers/projects/createProject";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewVideoUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(new Date());

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {};
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
            name="title"
            type="text"
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

      <Button
        variant="default"
        size="lg"
        className="ml-auto"
        isLoading={isLoading}
      >
        save project
      </Button>
    </form>
  );
};

export default CreateProject;
