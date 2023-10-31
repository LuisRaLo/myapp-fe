/* eslint-disable react-hooks/exhaustive-deps */
import { SyntheticEvent, useEffect, useState } from "react";
import StorageHelper from "../utils/helpers/storage";
import IItinerary, { IItineraryForm } from "../utils/interfaces/IItinerary";
import FireStoreHelper from "../utils/helpers/firestore";
import { ItinenaryEnum } from "../utils/enums/ItinearyEnum";
import { useNavigate } from "react-router-dom";

export default function useAddItinerary() {
  const [itineraryObjectForm, setItineraryObjectForm] =
    useState<IItineraryForm>({
      name: "",
      description: "",
      location: { lat: 4.80485889, lng: -75.7549616 },
      pathImage: null,
    });

  const [location, setLocation] = useState({
    lat: 4.8048588,
    lng: -75.7549616,
  });

  useEffect(() => {
    setItineraryObjectForm({ ...itineraryObjectForm, location: location });
  }, [location]);

  const navigate = useNavigate();

  async function insertData(
    _event: SyntheticEvent,
    dataItinerary: IItinerary[],
    type: ItinenaryEnum
  ) {
    try {
      _event.preventDefault();

      const nextId = lookingNextId(dataItinerary);

      console.log("1", nextId);

      const dataValidate = await formValidation(nextId);

      const update = await FireStoreHelper.insertItinerary(type, dataValidate);

      if (update) {
        navigate(0);

        return alert("Itinerary inserted successfully");
      }
      return alert("Itinerary inserted error");
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

  async function formValidation(nextId: number): Promise<IItinerary> {
    const itineraryDatatoInsert: IItinerary = {
      id: nextId,
      name: itineraryObjectForm.name,
      description: itineraryObjectForm.description,
      location: itineraryObjectForm.location,
      pathImage: null,
    };

    if (itineraryDatatoInsert.name === "") throw new Error("Name is required");

    if (itineraryDatatoInsert.location === null)
      throw new Error("Location is required");

    console.log("3", itineraryDatatoInsert);

    if (itineraryObjectForm.pathImage !== null) {
      const urlFile = await updateImage();

      if (urlFile === "Image upload error")
        throw new Error("Image upload error");

      itineraryDatatoInsert.pathImage = urlFile;
    } else {
      throw new Error("Image is required");
    }

    return itineraryDatatoInsert;
  }

  function lookingNextId(itineraryData: IItinerary[]): number {
    let id: number = -1;
    itineraryData.forEach((element) => {
      if (element.id > id) id = element.id;
    });

    return id + 1;
  }

  return {
    insertData,

    itineraryObjectForm,
    setItineraryObjectForm,
    location,
    setLocation,
  };
}
