'use client';

import { ChangeEvent, useState } from 'react';

type Inputs = {
  [key: string]: string;
};

type UseFormHook = {
  inputs: Inputs;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

const useForm = (fields: any): UseFormHook => {
  const initialInputs = fields.reduce((acc: any, name: string | number) => {
    acc[name] = '';
    return acc;
  }, {});

  const [inputs, setInputs] = useState(initialInputs);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    inputs,
    handleInput,
  };
};

export default useForm;
