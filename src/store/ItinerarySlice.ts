import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import IItinerary from "../utils/interfaces/IItinerary";

export interface ItinararyState {
  itinarary: IItinerary[];
}

const initialState: ItinararyState = {
  itinarary: [],
};

export const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    setItinerary: (state, action: PayloadAction<IItinerary[]>) => {
      state.itinarary = action.payload;
    },

    addItinerary: (state, action: PayloadAction<IItinerary>) => {
      state.itinarary.push(action.payload);
    },

    updateItinerary: (state, action: PayloadAction<IItinerary>) => {
      const index = state.itinarary.findIndex(
        (itinerary) => itinerary.id === action.payload.id
      );

      if (index !== -1) {
        state.itinarary[index] = action.payload;
      }
    },

    deleteItinerary: (state, action: PayloadAction<number>) => {
      const index = state.itinarary.findIndex(
        (itinerary) => itinerary.id === action.payload
      );

      if (index !== -1) {
        state.itinarary.splice(index, 1);
      }
    },
  },
});

export const { setItinerary, addItinerary, updateItinerary, deleteItinerary } =
  itinerarySlice.actions;

export default itinerarySlice.reducer;
