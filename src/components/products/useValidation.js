import { useState } from "react";

function useValidation(initialState, validationRules) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    const rule = validationRules[field];
    if (rule) {
      const errorMessage = rule(value);
      setErrors((prev) => ({
        ...prev,
        [field]: errorMessage,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  return {
    values,
    errors,
    handleChange,
  };
}

export default useValidation;
