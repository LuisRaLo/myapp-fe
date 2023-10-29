import { useCallback, useEffect, useState } from "react";
import { ItinenaryEnum } from "../utils/enums/ItinearyEnum";
import IItinerary from "../utils/interfaces/IItinerary";
import FireStoreHelper from "../utils/helpers/firestore";

export default function useItinerary(type: number) {
  const [itineraryType, setItineraryType] = useState<ItinenaryEnum>();

  const [itinerary, setItinerary] = useState<IItinerary[]>([]);

  const getItinerary = useCallback(async () => {
    try {
      if (!itineraryType) return null;

      const data = await FireStoreHelper.getItinerary(itineraryType);

      setItinerary(data);
    } catch (error) {
      console.log(error);
    }
  }, [itineraryType]);

  function toEnum() {
    switch (type) {
      case 1:
        setItineraryType(ItinenaryEnum.places);
        break;
      case 2:
        setItineraryType(ItinenaryEnum.events);
        break;
      case 3:
        setItineraryType(ItinenaryEnum.restaurants);
        break;
      case 4:
        setItineraryType(ItinenaryEnum.enterprises);
        break;
    }
  }

  useEffect(() => {
    getItinerary();
  }, [itineraryType, getItinerary]);

  useEffect(() => {
    toEnum();
  });

  return {
    itineraryType,
    itinerary,
  };
}
