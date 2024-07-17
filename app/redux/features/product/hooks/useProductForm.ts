import { useEffect, useState } from "react";

const useProductForm = (data: any) => {
  const [inputs, setInputs] = useState({
    productName: "",
    publish: false,
    description: "",
    image: "",
    fileName: "",
  });

  useEffect(() => {
    if (data) {
      setInputs((prev: any) => ({
        ...prev,
        productName: data?.productName,
        image: data?.image,
        publish: data?.publish,
        description: data?.description,
        fileName: data?.fileName,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    const { name, value, type, checked } = e.target;
    const val =
      type === "number" ? +value : type === "checkbox" ? checked : value;

    setInputs((prev: any) => ({
      ...prev,
      [name]: val,
    }));
  };

  return { handleInput, inputs, setInputs };
};

export default useProductForm;
