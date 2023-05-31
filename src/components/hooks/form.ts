import { useState } from "react";

export default function useForm(initialValues: any) {
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

  function handleSubmit(submitFunction: any) {
    submitFunction();
  }

  return {
    values,
    handleChange,
    handleSubmit,
  };
}
