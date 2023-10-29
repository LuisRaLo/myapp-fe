import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore";
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
    Object.keys(collection).forEach((key) => {
      const element = collection[key];
      array.push(element);
    });
    return this.toDomain(array);
  }

  public static async updateItinerary(
    type: ItinenaryEnum,
    id: number,
    itinerary: IItinerary
  ): Promise<boolean> {
    try {
      const documentRef = doc(firestore, "itinerary", type);
      await updateDoc(documentRef, {
        [id]: itinerary,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public static async insertItinerary(
    type: ItinenaryEnum,
    itinerary: IItinerary
  ): Promise<boolean> {
    try {
      const documentRef = doc(firestore, "itinerary", type);

      const data = await this.getItinerary(type);

      const newItinerary = {
        ...itinerary,
        id: data.length + 1,
      };

      await updateDoc(documentRef, {
        [data.length]: newItinerary,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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
