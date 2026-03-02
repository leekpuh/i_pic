import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addFavorite, removeFavorite } from "../store/reducers/favoritesSlice";
import { IPhoto } from "../models/IPhoto";
import { useSession } from "next-auth/react";

export function ImageZoom({
  id,
  url,
  photo,
}: {
  id: string;
  url: string;
  photo: IPhoto;
}) {
  const [showLabel, setShowLabel] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.photos);

  const isFavorite = favorites.some((f) => f.id === id);

  const session = useSession();

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(photo));
    }
  };

  return (
    <div
      onMouseOver={() => setShowLabel(true)}
      onMouseLeave={() => setShowLabel(false)}
      className=" hover:scale-120 transition-transform duration-400 cursor-pointer hover:border border-gray-200 hover:shadow-xl rounded-md overflow-hidden  hover:p-2 bg-white"
    >
      <img
        src={url}
        alt="Фото"
        width={300}
        height={200}
        className="w-full rounded-md "
      ></img>
      {showLabel && (
        <div className="flex justify-around mt-2">
          {session?.data && (
            <button
              onClick={handleFavorite}
              className={`size-7 border border-gray-300 justify-items-center rounded-full cursor-pointer hover:border-blue-500 ${isFavorite ? "bg-yellow-200" : ""}`}
            >
              <img src="/star.png" className="size-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
