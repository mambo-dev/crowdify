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
import { IProjectValues } from "./newProject";

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
  values: IProjectValues;
  setDeadline: React.Dispatch<React.SetStateAction<Date | null>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
};

const ProjectDetails = ({ values, handleChange, setDeadline }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-slate-700">title</label>
          <Input onChange={handleChange} value={values.title} name="title" />
        </div>

        <DatePickerComponent
          date={values.deadline}
          setDate={setDeadline}
          label="deadline"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-slate-700">description</label>
        <TextArea
          onChange={handleChange}
          value={values.description}
          name="description"
        />
      </div>
    </>
  );
};

export default ProjectDetails;
