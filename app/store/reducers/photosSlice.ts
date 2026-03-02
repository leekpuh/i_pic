

import { IPhotosState } from "@/app/models/IPhotosState";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { photos as localPhotos } from "../../data/photos";
import { IPhoto } from "@/app/models/IPhoto";
import { RootState } from "../../store/store";

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
  async ({ page, query }, { getState }) => {
    const pageSize = 20;

    const state = getState();
    const alreadyLoaded: IPhoto[] = state.photos.photos;
    const alreadyIds = new Set(alreadyLoaded.map((p) => p.id));

    const filtered = localPhotos.filter((p) =>
      query ? p.desc.toLowerCase().includes(query.toLowerCase()) : true
    );
    const start = (page - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);
    const newData = pageData.filter((p) => !alreadyIds.has(p.id));

    if (newData.length > 0) return newData;

    try {
      const res = await fetch(`/api?page=${page}&query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Server not available");
      const data: IPhoto[] = await res.json();
      return data.filter((p) => !alreadyIds.has(p.id));
    } catch (err) {
      console.warn("Server fetch failed, using local data", err);
      return newData; // fallback на локальные данные
    }
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