"use client";
import React from "react";
import { IProjectValues } from "./newProject";
import { Input } from "../ui/input";
import DatePickerComponent from "../utils/date-picker";
import Heading from "../ui/heading";
import Paragraph from "../ui/paragraph";
import { TextArea } from "../ui/textarea";

type Props = {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  values: IProjectValues;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const BasicInformation = ({ handleChange, values, setDate }: Props) => {
  return (
    <div className="border-b border-gray-900/10 pb-12 w-full flex flex-col gap-3">
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
          onChange={handleChange}
          value={values.title}
          name="title"
          type="text"
          className="bg-white"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <label className="font-medium text-slate-700">description</label>
        <TextArea
          onChange={handleChange}
          value={values.description}
          name="description"
          className="bg-white"
        />
      </div>

      <DatePickerComponent
        date={values.deadline}
        label="deadline"
        setDate={setDate}
      />
    </div>
  );
};

export default BasicInformation;
