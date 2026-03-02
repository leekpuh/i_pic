import { configureStore } from "@reduxjs/toolkit";
import photosSlice from "./reducers/photosSlice"
import favoritesSlice from "./reducers/favoritesSlice"

export const store = configureStore({ reducer: {
    photos: photosSlice,
    favorites: favoritesSlice,
} });


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch