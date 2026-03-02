import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("vvv")
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const query = searchParams.get("query");

  // let url = query
  //   ? `https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${query}`
  //   : `https://api.unsplash.com/photos?page=${page}&per_page=20`;
  let url = query ? `https://api.vecteezy.com/v2/75443/resources?term=${query}&per_page=20&page=${page}&content_type=photo` :
  `https://api.vecteezy.com/v2/75443/resources?term=lifestyle&per_page=20&page=${page}&content_type=photo`


       console.log("aaa")
    const res = await fetch(url, {
      headers: {
        // Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        Authorization: `Bearer ${process.env.VECTEEZY_ACCESS_KEY}`,
        Accept: "application/json"

      },
    });

    if (!res.ok) {
      console.error("Ошибка API", res.status, res.statusText);
      return NextResponse.json([], { status: res.status });
    }

    const data = await res.json();
    console.log("VEKT JSON RES", data)
    return NextResponse.json(data.resources);

}
