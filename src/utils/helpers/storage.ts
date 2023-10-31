import { storage } from "../configs/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

export default class StorageHelper {
  public static async uplodadImage(file: File): Promise<string> {
    const storageRef = ref(storage, file.name);

    return uploadBytes(storageRef, file).then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    });
  }

  public static async deleteImage(path: string) {
    const storageRef = ref(storage, path);

    return deleteObject(storageRef).then(() => {
      return true;
    });
  }
}
