import { Inputs } from "../types/common.types";

interface ValidationErrors {
  code?: string;
}

const validatePublicVerifyCodeForm = (
  inputs: Inputs,
  setErrors: any
): boolean => {
  const newErrors: ValidationErrors = {};

  // Validate code
  if (!inputs?.code?.trim()) {
    newErrors.code = "Code is required";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

export default validatePublicVerifyCodeForm;
