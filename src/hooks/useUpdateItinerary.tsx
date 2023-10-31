import { SyntheticEvent, useState } from "react";
import StorageHelper from "../utils/helpers/storage";
import IItinerary, { IItineraryForm } from "../utils/interfaces/IItinerary";
import FireStoreHelper from "../utils/helpers/firestore";
import { ItinenaryEnum } from "../utils/enums/ItinearyEnum";
import { useNavigate } from "react-router-dom";

export default function useUpdateItinerary() {
  const [itineraryObjectForm, setItineraryObjectForm] =
    useState<IItineraryForm>({
      name: "",
      description: "",
      location: { lat: 0, lng: 0 },
      pathImage: null,
    });

  const navigate = useNavigate();

  async function updateData(
    _event: SyntheticEvent,
    oldData: IItinerary,
    type: ItinenaryEnum
  ) {
    try {
      _event.preventDefault();

      const dataValidate = await formValidation(oldData, itineraryObjectForm);

      const update = await FireStoreHelper.updateItinerary(type, dataValidate);
      if (update) {
        navigate(0);
        return alert("Itinerary updated successfully");
      }

      return alert("Itinerary update error");
    } catch (error) {
      console.log(error);
      alert("Error: " + error.message);
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
      location: {
        lat: 0,
        lng: 0,
      },
      pathImage: oldItinerary.pathImage,
    };

    if (newItinerary.name === "") itinerary.name = oldItinerary.name;
    else itinerary.name = newItinerary.name;

    if (newItinerary.description === "")
      itinerary.description = oldItinerary.description;
    else itinerary.description = newItinerary.description;

    if (
      (newItinerary.location.lat === 0 && newItinerary.location.lng === 0) ||
      (newItinerary.location.lat === oldItinerary.location.lat &&
        newItinerary.location.lng === oldItinerary.location.lat)
    )
      itinerary.location = oldItinerary.location;
    else
      itinerary.location = {
        lat: newItinerary.location.lat,
        lng: newItinerary.location.lng,
      };

    if (newItinerary.pathImage !== null) {
      const urlFile = await updateImage();

      if (urlFile === "Image upload error")
        itinerary.pathImage = oldItinerary.pathImage;

      itinerary.pathImage = urlFile;
    } else {
      itinerary.pathImage = oldItinerary.pathImage;
    }

    return itinerary;
  }

  return {
    updateData,

    itineraryObjectForm,
    setItineraryObjectForm,
  };
}
