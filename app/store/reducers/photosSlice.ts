

import { IPhotosState } from "@/app/models/IPhotosState";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState: IPhotosState = {
  photos: [],
  page: 1,
  query: "",
  isLoading: false,
};

export const fetchPhotos = createAsyncThunk (
    "photos/fetchPhotos",
  async ({ page, query }: { page: number; query: string }) => {
    const res = await fetch(`/api?page=${page}&query=${query}`);
    return await res.json();
  }
)

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