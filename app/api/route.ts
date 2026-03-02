import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("vvv")
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  const query = searchParams.get("query");

  let url = query
    ? `https://api.unsplash.com/search/photos?page=${page}&per_page=20&query=${query}`
    : `https://api.unsplash.com/photos?page=${page}&per_page=30`;


       console.log("aaa")
    const res = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!res.ok) {
         console.log("yyy")
      console.error("Ошибка Unsplash API", res.status, res.statusText);
      return NextResponse.json([], { status: res.status });
    }

    const data = await res.json();
    const results = data.results ? data.results : data; 

    return NextResponse.json(results || []);

}
