"use client";
import React, { useState } from "react";
import { IProjectValues } from "./newProject";
import { Input } from "../ui/input";
import DatePickerComponent from "../utils/date-picker";
import Heading from "../ui/heading";
import Paragraph from "../ui/paragraph";
import { TextArea } from "../ui/textarea";
import Button from "../ui/button";
import useForm from "../hooks/form";
import { z } from "zod";
import { editBasicInformation } from "../../app/helpers/projects/editProject";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { IBasicInformation } from "../../types/api";
import { basicInformationSchema } from "../../lib/schemas/schemas";

type Props = {
  project_title: string;
  project_deadline: Date | null;
  project_description: string;
  project_id: number;
};

const BasicInformation = ({
  project_title,
  project_deadline,
  project_description,
  project_id,
}: Props) => {
  const [deadline, setDeadline] = useState<Date | null>(project_deadline);
  const [title, setTitle] = useState<string>(project_title);
  const [description, setDescription] = useState<string>(project_description);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    try {
      const {
        deadline: validDeadline,
        description: validDescription,
        title: validTitle,
      } = basicInformationSchema.parse({
        title,
        description,
        deadline,
      });

      await editBasicInformation(
        {
          deadline: validDeadline,
          description: validDescription,
          title: validTitle,
        },
        project_id
      );

      router.refresh();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          toast({
            message: issue.message,
            title: "Invalid Input",
            type: "error",
            duration: 4000,
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
        message: "something went wrong. Please try again later",
        title: "Error",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
      className="border-b border-gray-900/10 pb-12 w-full flex flex-col gap-3"
    >
      <div className="flex flex-col items-start w-full">
        <Heading size="xs" className="text-left mr-auto">
          Project information
        </Heading>
        <Paragraph size="sm" className="text-left mr-auto">
          Provide basic information of your projects such as title and a
          description
        </Paragraph>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="font-medium text-slate-700">title</label>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          type="text"
          className="bg-white"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="font-medium text-slate-700">description</label>
        <TextArea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name="description"
          className="bg-white"
        />
      </div>

      <DatePickerComponent
        date={deadline}
        label="deadline"
        setDate={setDeadline}
      />

      <div className="mt-4 ml-auto">
        <Button isLoading={isLoading} variant="default" size="lg">
          save
        </Button>
      </div>
    </form>
  );
};

export default BasicInformation;
