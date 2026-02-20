"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { setQuery, fetchPhotos } from "../store/reducers/photosSlice";
import { debounce } from "lodash";
import { useMemo } from "react";

export function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.photos.query);
   const page = useSelector((state: RootState) => state.photos.page);

  const debouncedLoadMore = useMemo(
    () =>
      debounce((pageToLoad: number, currentQuery: string) => {
        dispatch(fetchPhotos({ page: pageToLoad, query: currentQuery }));
      }, 1000),
    [dispatch]
  );
  
  return (
    <header className="border-b border-gray-300 bg-neutral-200 pt-4 flex justify-between items-center px-5">
      <h1 className="text-3xl font-bold text-neutral-700 mb-4 mx-5">i-Pic</h1>
      <div className="flex items-center bg-white h-10 rounded-md mb-4 border-gray-300 border-2">
        <input
          className=" rounded-md w-120 p-2 outline-none"
          placeholder="Поиск..."
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              debouncedLoadMore.cancel();
               dispatch(fetchPhotos({ page: 1, query }));
            }
          }}
        />
        {query && (
          <button
            className="text-red-700 font-bold cursor-pointer px-2 py-1 rounded-full gap-2 mr-1 hover:bg-red-100/75 "
            onClick={() => dispatch(setQuery(""))}
          >
            ✕
          </button>
        )}
      </div>
    </header>
  );
}
