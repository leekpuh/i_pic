import { NextResponse } from 'next/server'



export async function GET(page: number, limit: number) {
  let url: string = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
  try {
    const res = await fetch(url, {method: 'GET'})
    if (!res.ok) return NextResponse.json({ error: 'Upstream fetch failed' }, { status: res.status })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Fetch error', details: String(err) }, { status: 500 })
  }
}
