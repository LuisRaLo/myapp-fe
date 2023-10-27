interface IItinerary {
  id: number;
  name: string;
  description?: string;
  location?: string;
  pathImage: string;
}

export interface IItineraryForm {
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  pathImage: File | null;
}

export default IItinerary;
