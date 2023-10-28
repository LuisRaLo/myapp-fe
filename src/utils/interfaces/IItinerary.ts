interface IItinerary {
  id: number;
  name: string;
  description?: string;
  location?: {
    lat: number;
    lng: number;
  };
  pathImage: string;
}

export interface IItineraryForm {
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  pathImage: File | null | string;
}

export default IItinerary;
