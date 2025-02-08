import { Inputs } from "../types/common.types";

interface ValidationErrors {
  username?: string;
}

const validateProfileUsernameForm = (
  inputs: Inputs,
  setErrors: any
): boolean => {
  const newErrors: ValidationErrors = {};

  // Validate username
  if (!inputs?.username?.trim()) {
    newErrors.username = "Username is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

export default validateProfileUsernameForm;
