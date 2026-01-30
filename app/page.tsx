"use client";

import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { ImageZoom } from "./components/ImageZoom";

interface Photo {
  id: string;
  urls: { regular: string };
  user: { name: string } | null;
  author: string | null;
  width: number;
  height: number;
}

export default function Page() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");


  useEffect(() => {
    setPhotos([]); 
    setPage(1); 
    if (query !== "") {
      loadMore(1, query); 
    } else {
      loadMore(1); 
    }
  }, [query]);

  async function loadMore(pageToLoad = page, currentQuery = query) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api?page=${pageToLoad}&query=${currentQuery}`,
      );
      const data = await response.json();
      setPhotos((prev) => [...prev, ...data]);
      setPage(pageToLoad + 1);
    } catch (err) {
      console.error("Ошибка загрузки", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <header className="border-b border-gray-300 bg-gray-200 pt-4 flex justify-between items-center px-5">
        <h1 className="text-3xl font-bold mb-4 mx-5">i-Pic</h1>
        <div className="flex items-center bg-white h-10 rounded-md mb-4 border-gray-300 border-2">
          <input
            className=" rounded-md w-120 p-2 outline-none"
            placeholder="Поиск..."
            value={query ?? ""}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="text-red-700 font-bold cursor-pointer px-2 py-1 rounded-full gap-2 mr-1 hover:bg-red-100/75 "
              onClick={() => setQuery("")}
            >
              ✕
            </button>
          )}
        </div>
      </header>

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
            onClick={() => loadMore()}
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
