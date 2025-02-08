import { Errors, Inputs } from "./common.types";

export interface AdminProfileInputProps {
  containerStyles?: string; // CSS styles for the container, optional
  name: string; // Name of the input field
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void; // Input handler function
  label: string; // Label text for the input
  submitted: boolean; // Indicates if the form has been submitted
  value: string | number; // Current value of the input field
  error?: string; // Error message, optional
}

export interface AdminProductFormProps {
  handleSubmit: (event: React.FormEvent) => void;
  isUpdating: boolean;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  inputs: Inputs;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Errors;
  submitted: boolean;
  handleInput: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  reset: () => void;
  loading: boolean;
  error: string;
  handleToggle?: any;
  uploadProgress?: any;
}
