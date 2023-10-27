import { SyntheticEvent, useState } from "react";
import StorageHelper from "../utils/helpers/storage";
import IItinerary, { IItineraryForm } from "../utils/interfaces/IItinerary";
import FireStoreHelper from "../utils/helpers/firestore";
import { ItinenaryEnum } from "../utils/enums/ItinearyEnum";

export default function useUpdateItinerary() {
  const [itineraryObjectForm, setItineraryObjectForm] =
    useState<IItineraryForm>({
      name: "",
      description: "",
      location: { lat: 0, lng: 0 },
      pathImage: null,
    });

  async function updateData(
    _event: SyntheticEvent,
    oldData: IItinerary,
    type: ItinenaryEnum
  ) {
    try {
      _event.preventDefault();

      const dataValidate = await formValidation(oldData, itineraryObjectForm);

      console.log(
        "=======================================================>",
        dataValidate
      );

      const update = await FireStoreHelper.updateItinerary(type, dataValidate);

      console.log(update);

      if (update) {
        window.location.reload();
        return alert("Itinerary updated successfully");
      }

      return alert("Itinerary update error");
    } catch (error) {
      console.log(error);
    }
  }

  async function updateImage(): Promise<string> {
    try {
      if (!(itineraryObjectForm.pathImage instanceof File)) return "Sin imagen";
      if (itineraryObjectForm.pathImage === null) return "Sin imagen";

      const urlFile = await StorageHelper.uplodadImage(
        itineraryObjectForm.pathImage
      );

      return urlFile;
    } catch (error) {
      return "Image upload error";
    }
  }

  async function formValidation(
    oldItinerary: IItinerary,
    newItinerary: IItineraryForm
  ): Promise<IItinerary> {
    const itinerary: IItinerary = {
      id: oldItinerary.id,
      name: "",
      description: "",
      location: "",
      pathImage: "",
    };

    if (newItinerary.name === "") itinerary.name = oldItinerary.name;
    else itinerary.name = newItinerary.name;

    if (newItinerary.description === "")
      itinerary.description = oldItinerary.description;
    else itinerary.description = newItinerary.description;

    if (newItinerary.location.lat === 0 && newItinerary.location.lng === 0)
      itinerary.location = oldItinerary.location;
    else
      itinerary.location = `${newItinerary.location.lat},${newItinerary.location.lng}`;

    if (newItinerary.pathImage) {
      if (!(newItinerary.pathImage instanceof File))
        itinerary.pathImage = oldItinerary.pathImage;

      const urlFile = await updateImage();

      if (urlFile === "Image upload error")
        itinerary.pathImage = oldItinerary.pathImage;

      itinerary.pathImage = urlFile;
    }

    return itinerary;
  }

  return {
    updateData,

    itineraryObjectForm,
    setItineraryObjectForm,
  };
}
