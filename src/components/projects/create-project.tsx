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
import { z } from "zod";
import { nextDay } from "date-fns";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const projectSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  deadline: z.coerce
    .date()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "a valid date is required",
    })
    .transform((date) => new Date(date)),
});

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
  const [deadline, setDeadline] = useState<Date | null>(nextDay(new Date(), 1));

  const router = useRouter();

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const {
        deadline: validDeadline,
        title: validTitle,
        description: validDescription,
      } = projectSchema.parse({
        title,
        description,
        deadline,
      });

      await createProject({
        deadline: validDeadline,
        title: validTitle,
        description: validDescription,
      });

      toast({
        title: "Project",
        message: "you have succesfully created a project",
        type: "success",
      });

      Cookies.set(
        "currentStep",
        JSON.stringify({
          step: 2,
          text: "Add goal",
          complete: false,
        })
      );

      router.refresh();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          toast({
            message: issue.message,
            title: "Input errors",
            type: "error",
          });
        });

        return;
      }

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
      className="flex flex-col py-2 border border-slate-300 rounded-md px-2 gap-3 bg-white/30 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-slate-700">title</label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
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
