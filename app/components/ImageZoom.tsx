import Image from "next/image";
import { useEffect, useState } from "react";

export function ImageZoom({ id, url, author }: { id: string; url: string; author: string; }) {
    const [showLabel, setShowLabel] = useState(false);
    // let showLabel = showLabelProp;
    return (
        <div
            
              onMouseOver={() => setShowLabel(true)}
              onMouseLeave={() => setShowLabel(false)}
            className=" hover:scale-120 transition-transform duration-400 cursor-pointer hover:border-1 border-gray-200 hover:shadow-xl rounded-md overflow-hidden  text-center hover:p-2 bg-white"
            >
            <Image
                src={url}
                alt={author || "Photo"}
                width={300}
                height={200}
                className="w-full rounded-md "
            ></Image>
            {showLabel && (
                <div>{author}</div>
            )}
            </div>
        );
}