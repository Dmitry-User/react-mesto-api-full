import { useState } from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValidForm, setIsValidForm] = useState(false);

  function handleChange(e) {
    const { value, name } = e.target;
    const errorMessage = e.target.validationMessage;

    setValues((old) => ({ ...old, [name]: value }));
    setErrors((old) => ({ ...old, [name]: errorMessage }));
    setIsValidForm(e.target.closest(".form").checkValidity());
  }

  function resetForm() {
    setErrors({});
    setIsValidForm(false);
  }

  return { values, setValues, handleChange, errors, isValidForm, resetForm };
}

export default useForm;
