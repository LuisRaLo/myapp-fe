import { DocumentData, doc, getDoc } from "firebase/firestore";
import { firestore } from "../configs/firebase";

export default class FireStoreHelper {
  public static async getCollection(
    collectionName: string
  ): Promise<DocumentData[]> {
    const docRef = doc(firestore, collectionName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as DocumentData[];
    } else {
      return [];
    }
  }
}
