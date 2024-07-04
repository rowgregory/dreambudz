import { useEffect, useState } from 'react';

const useCodeForm = (data: any) => {
  const [inputs, setInputs] = useState({
    code: '',
    id: 0,
  });

  useEffect(() => {
    if (data) {
      setInputs((prev: any) => ({
        ...prev,
        code: data?.code?.code,
        id: data?.code?.id,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;

    setInputs((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { handleInput, inputs, setInputs };
};

export default useCodeForm