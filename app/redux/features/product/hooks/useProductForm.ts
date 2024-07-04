import { useEffect, useState } from "react";

const useProductForm = (data: any) => {
  const [inputs, setInputs] = useState({
    productName: "",
    quantity: 0,
    description: "",
    image: "",
    id: "",
  });

  useEffect(() => {
    if (data) {
      setInputs((prev: any) => ({
        ...prev,
        productName: data?.productName,
        image: data?.image,
        quantity: data?.quantity,
        description: data?.description,
        id: data?.id,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? +value : value;

    setInputs((prev: any) => ({
      ...prev,
      [name]: val,
    }));
  };

  return { handleInput, inputs, setInputs };
};

export default useProductForm;
