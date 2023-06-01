import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";

const fromNextDay = addDays(new Date(), 1);

type Props = {
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  date: Date | null;
  label: string;
  showTimeSelectOnly?: boolean;
  dateFormat?: string;
};

export default function DatePickerComponent({
  date,
  setDate,
  label,

  dateFormat,
}: Props) {
  return (
    <div className={` flex flex-col gap-2 w-full text-slate-800 font-medium`}>
      <label className="font-medium text-slate-700"> {label} </label>
      <DatePicker
        selected={date}
        showMonthDropdown
        showPopperArrow
        todayButton
        showTimeSelect
        minDate={fromNextDay}
        onChange={(date) => setDate(date)}
        dateFormat={dateFormat}
        placeholderText="select date"
        className="flex bg-white  h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:border-purple-600 hover:border-purple-500  ring-opacity-30 ring-purple-300 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-green-300 dark:focus:ring-offset-green-900"
      />
    </div>
  );
}
