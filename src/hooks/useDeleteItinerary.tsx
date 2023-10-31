import { useNavigate } from "react-router-dom";
import { ItinenaryEnum } from "../utils/enums/ItinearyEnum";
import FireStoreHelper from "../utils/helpers/firestore";
import StorageHelper from "../utils/helpers/storage";
import IItinerary from "../utils/interfaces/IItinerary";

export default function useDeleteItinerary() {
  const navigate = useNavigate();

  async function deleteElement(
    type: ItinenaryEnum,
    itinerarySelected: IItinerary
  ) {
    const deleteImageResult = await deleteImage(itinerarySelected.pathImage);

    if (!deleteImageResult) return alert("Image upload error");

    const deleteResult = await FireStoreHelper.deleteItinerary(
      type,
      itinerarySelected
    );

    if (deleteResult) {
      navigate(0);
      return alert("Itinerary deleted successfully");
    }

    return alert("Itinerary delete error");
  }

  async function deleteImage(path: string): Promise<boolean> {
    try {
      return StorageHelper.deleteImage(path);
    } catch (error) {
      console.error("Image upload error");
      return false;
    }
  }

  return { deleteElement };
}
