import { ItenaryEnum } from "../enums/ItinearyEnum";

interface IItinerary {
  id: number;
  type: ItenaryEnum;
  name: string;
  description?: string;
  location?: string;
  pathImage: string;
}

export default IItinerary;
