import { Inputs } from "../types/common.types";

interface ValidationErrors {
  username?: string;
  password?: string;
}

const validateLoginForm = (inputs: Inputs, setErrors: any): boolean => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.username?.trim()) {
    newErrors.username = "Username is required";
  }

  if (!inputs?.password?.trim()) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

export default validateLoginForm;
