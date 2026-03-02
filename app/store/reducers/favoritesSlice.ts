

import { IFavorites } from "@/app/models/IFavorites";
import { IPhoto } from "@/app/models/IPhoto";
import { createSlice } from "@reduxjs/toolkit";


const initialState: IFavorites = {
  photos: [],
};


const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      // Проверяем, что такого фото ещё нет
      const exists = state.photos.find(photo => photo.id === action.payload.id);
      if (!exists) {
        state.photos.push(action.payload);
      }
    },
    removeFavorite(state, action) {
      state.photos = state.photos.filter(photo => photo.id !== action.payload);
    },
    resetFavorites(state) {
      state.photos = [];
    },
  },
});

export const { addFavorite, removeFavorite, resetFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;