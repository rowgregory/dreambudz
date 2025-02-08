import { Errors, Inputs } from "./common.types";

export interface DragAndDropUploaderProps {
  inputs: Inputs;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ClientLeadFormProps {
  formStyles: string;
  inputStyles: string;
  selectStyles: string;
  buttonStyles?: string;
  errorStyles?: string;
  bubbleColor?: string;
}

export interface AdminServiceFormProps {
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
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  reset: () => void;
  loading: boolean;
  error: string;
}
