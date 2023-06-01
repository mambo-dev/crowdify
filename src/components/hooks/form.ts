import { useState } from "react";

export default function useForm(initialValues: any, submitFunction: any) {
  const [values, setValues] = useState(initialValues);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitFunction(values);
  }

  return {
    values,
    handleChange,
    handleSubmit,
  };
}
