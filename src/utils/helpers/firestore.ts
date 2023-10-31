import { DocumentData, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../configs/firebase";
import IItinerary from "../interfaces/IItinerary";
import { ItinenaryEnum } from "../enums/ItinearyEnum";

export default class FireStoreHelper {
  public static async getCollection(
    collectionName: string
  ): Promise<DocumentData[]> {
    if (!collectionName) return [];

    const docRef = doc(firestore, "myApp", collectionName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as DocumentData[];
    } else {
      return [];
    }
  }

  public static async insertItinerary(
    type: ItinenaryEnum,
    itinerary: IItinerary
  ): Promise<boolean> {
    try {
      const documentRef = doc(firestore, "myApp", "itinerary");

      const collection = await this.getCollection("itinerary");

      await updateDoc(documentRef, {
        [type]: [...collection[type], itinerary],
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public static async getItinerary(type: ItinenaryEnum): Promise<IItinerary[]> {
    const array: IItinerary[] = [];
    const collection = await this.getCollection("itinerary");
    collection[type].forEach((element: IItinerary) => {
      array.push(element);
    });
    return this.toDomain(array);
  }

  public static async updateItinerary(
    type: ItinenaryEnum,
    itinerary: IItinerary
  ): Promise<boolean> {
    try {
      const documentRef = doc(firestore, "myApp", "itinerary");

      const collection = await this.getCollection("itinerary");

      const index = collection[type].findIndex(
        (element: IItinerary) => element.id === itinerary.id
      );

      collection[type][index] = itinerary;

      await updateDoc(documentRef, {
        [type]: collection[type],
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public static async deleteItinerary(
    type: ItinenaryEnum,
    itinerary: IItinerary
  ): Promise<boolean> {
    try {
      const documentRef = doc(firestore, "myApp", "itinerary");

      const collection = await this.getCollection("itinerary");

      const index = collection[type].findIndex(
        (element: IItinerary) => element.id === itinerary.id
      );

      collection[type].splice(index, 1);

      await updateDoc(documentRef, {
        [type]: collection[type],
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
