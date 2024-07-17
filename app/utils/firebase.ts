import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../config/firebaseConfig";

const uploadFileToFirebase = async (file: File) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, "images/" + file?.name);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      size: Math.round(snapshot.metadata.size / 1024),
      fileName: snapshot.metadata.name,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

const uploadMultipleFilesToFirebase = async (files: FileList | File[]) => {
  const downloadURLs = await Promise.all(
    Array.from(files).map((file) => uploadFileToFirebase(file))
  );
  return downloadURLs;
};

const deleteImageFromFirebase = async (fileName: string) => {
  const storage = getStorage();

  const desertRef = ref(storage, `images/${fileName}`);

  try {
    await deleteObject(desertRef);
    return true;
  } catch (error) {
    return false;
  }
};

export {
  uploadMultipleFilesToFirebase,
  uploadFileToFirebase,
  deleteImageFromFirebase,
};
