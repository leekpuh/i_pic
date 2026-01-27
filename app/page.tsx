"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GET } from "./api/route";
import Masonry from "react-masonry-css";
import { ImageZoom } from "./components/ImageZoom";

interface Photo {
  id: string;
  download_url: string;
  author: string | null;
  width: number;
  height: number;
}

export default function Page() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(2); // текущая страница
  const [isLoading, setIsLoading] = useState(false);
  // const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);

  // загружаем первую страницу
  useEffect(() => {
    loadMore();
  }, []);

  async function loadMore() {
    setIsLoading(true);
    try {
      const response = await GET(page, 30); // GET принимает номер страницы и limit
      const data = await response.json();
      setPhotos((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1); // увеличиваем страницу после успешной загрузки
    } catch (err) {
      console.error("Ошибка загрузки", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <header className="border-b border-gray-300 bg-gray-200 pt-4 ">
        <h1 className="text-3xl font-bold mb-4 text-center">i-Pic</h1>
      </header>
      <main className="flex flex-col bg-gray-100 py-5">
        <Masonry
          breakpointCols={4}
          className="flex gap-5"
          columnClassName="flex flex-col gap-5"
        >
          {photos.map((photo) => (
            <ImageZoom id={photo.id} url={photo.download_url} alt="Photo" author={photo.author || "Unknown"} />
          ))}
        </Masonry>
        <div className="flex justify-center flex-col items-center">
          {isLoading && <p className="p-8">Загрузка...</p>}
          <button
            onClick={loadMore}
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
