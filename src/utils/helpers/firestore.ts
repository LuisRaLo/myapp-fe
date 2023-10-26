import { DocumentData, doc, getDoc } from "firebase/firestore";
import { firestore } from "../configs/firebase";
import IItinerary from "../interfaces/IItinerary";
import { ItinenaryEnum } from "../enums/ItinearyEnum";

export default class FireStoreHelper {
  public static async getCollection(
    collectionName: string
  ): Promise<DocumentData[]> {
    if (!collectionName) return [];

    const docRef = doc(firestore, "itinerary", collectionName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as DocumentData[];
    } else {
      return [];
    }
  }

  public static async getItinerary(type: ItinenaryEnum): Promise<IItinerary[]> {
    const array: IItinerary[] = [];
    const collection = await this.getCollection(type);
    Object.keys(collection[0]).forEach((key) => {
      const element = (collection[0][key]);
      array.push(element);
    });
    return this.toDomain(array);
  }

  private static toDomain(document: DocumentData[]): IItinerary[] {
    const array: IItinerary[] = [];
    document.forEach((element) => {
      array.push({
        id: element.id,
        name: element.name || "",
        description: element.description || "",
        location: element.location || "",
        pathImage: element.pathImage || "",
      });
    });
    return array;
  }
}
