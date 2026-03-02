"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ImageZoom } from "../components/ImageZoom";
import Masonry from "react-masonry-css";

export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.photos);
  if (favorites.length === 0) {
    return (
      <div className="flex justify-center items-center p-2">
        <h1 className="">Нет избранных фото</h1>
      </div>
    );
  }
  return (

      <main className="flex flex-col bg-gray-100 py-5 mx-5">
        <Masonry
          breakpointCols={5}
          className="flex gap-5"
          columnClassName="flex flex-col gap-5"
        >
          {favorites.map((photo) => (
            <ImageZoom
              key={photo.id}
              id={photo.id}
              url={photo.urls?.regular}
            
              photo={photo}
            />
          ))}
        </Masonry>
      </main>

  );
}
