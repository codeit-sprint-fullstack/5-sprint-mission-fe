import { useState, useCallback } from "react";

export const useTogglePassword = (initialState = false) => {
  const [showPassword, setShowPassword] = useState(initialState);
  const toggle = useCallback(() => setShowPassword((prev) => !prev), []);
  return { showPassword, toggle };
};
