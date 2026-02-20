"use client";

import { useEffect, useMemo, useState } from "react";
import Masonry from "react-masonry-css";
import { ImageZoom } from "./components/ImageZoom";
import { IPhoto } from "./models/IPhoto";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";
import { resetPhotos, fetchPhotos } from "./store/reducers/photosSlice";

var throttle = require("lodash.throttle");
var debounce = require("lodash.debounce");

export default function Page() {

  const dispatch = useDispatch<AppDispatch>();
  const { photos, page, query, isLoading } = useSelector(
    (state: RootState) => state.photos
  );

  const debouncedLoadMore = useMemo(
    () =>
      debounce((pageToLoad: number, currentQuery: string) => {
        dispatch(fetchPhotos({ page: pageToLoad, query: currentQuery }));
      }, 1000),
    [dispatch]
  );

 useEffect(() => {
    const handleScroll = throttle(() => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 200 &&
        !isLoading
      ) {
         dispatch(fetchPhotos({page, query}))
      }
    }, 1000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, page, query]);

  useEffect(() => {
    dispatch(resetPhotos());
    if (query !== "") {
      debouncedLoadMore(1, query);
    } else {
      debouncedLoadMore.cancel()
      dispatch(fetchPhotos({page: 1, query: ""}));
    }
  }, [query]);

  return (
    <>
      

      <main className="flex flex-col bg-gray-100 py-5 mx-5">
        <Masonry
          breakpointCols={5}
          className="flex gap-5"
          columnClassName="flex flex-col gap-5"
        >
          {photos.map((photo) => (
            <ImageZoom
              key={photo.id}
              id={photo.id}
              url={photo.urls?.regular}
              author={photo.user?.name || "Unknown"}
            />
          ))}
        </Masonry>

        <div className="flex justify-center flex-col items-center">
          {isLoading && <p className="p-8">Загрузка...</p>}
          <button
            onClick={() => dispatch(fetchPhotos({ page, query }))}
            disabled={isLoading}
            className="p-2 my-10 bg-red-500 text-white w-[200px] rounded-md cursor-pointer"
          >
            Загрузить еще
          </button>
        </div>
      </main>
    </>
  );
}
