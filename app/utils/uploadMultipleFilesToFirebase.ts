import uploadFileToFirebase from "./uploadFileToFirebase";

const uploadMultipleFilesToFirebase = async (files: FileList | File[]) => {
  const downloadURLs = await Promise.all(
    Array.from(files).map((file) => uploadFileToFirebase(file))
  );
  return downloadURLs;
};

export default uploadMultipleFilesToFirebase;
