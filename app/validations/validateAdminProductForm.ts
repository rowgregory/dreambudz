import { Inputs } from "../types/common.types";

interface ValidationErrors {
  productName?: string;
  description?: string;
  image?: string;
}

const validateAdminProductForm = (inputs: Inputs, setErrors: any): boolean => {
  const newErrors: ValidationErrors = {};

  if (!inputs?.productName?.trim()) {
    newErrors.productName = "Product name is required";
  }
  if (!inputs?.description?.trim()) {
    newErrors.description = "Description is required";
  }

  if (!inputs?.url) {
    if (!inputs?.image?.trim()) {
      newErrors.image = "Image is required";
    }
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

export default validateAdminProductForm;
