

import { IPhotosState } from "@/app/models/IPhotosState";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { photos as localPhotos } from "../../data/photos";
import { IPhoto } from "@/app/models/IPhoto";
import { RootState } from "../../store/store";
import { Console } from "console";

const initialState: IPhotosState = {
  photos: [],
  page: 1,
  query: "",
  isLoading: false,
};

interface FetchParams {
  page: number;
  query: string;
}

export const fetchPhotos = createAsyncThunk<IPhoto[], FetchParams,  { state: RootState }>(
  "photos/fetchPhotos",
  async ({ page, query }) => {
   
      const res = await fetch(`/api?page=${page}&query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Server not available");
      console.log("RES", res)
      const data: IPhoto[] = await res.json();
      console.log("DATA", data)
      return data;
      

  }
);


const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
      state.photos = [];
    },
    resetPhotos(state) {
      state.photos = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.photos.push(...action.payload);
        state.page += 1;
        state.isLoading = false;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setQuery, resetPhotos } = photosSlice.actions;
export default photosSlice.reducer;