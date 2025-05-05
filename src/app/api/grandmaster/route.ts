import { NextRequest, NextResponse } from "next/server"

const API_URL = "https://api.chess.com/pub/player/"

const CACHE_DURATION = 1000 * 60 * 60 // cache for 1 hour

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username")

  try {
    const res = await fetch(`${API_URL}${username}`, {
      next: { revalidate: CACHE_DURATION },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      )
    }

    const data = await res.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: `Internal error ${error}` },
      { status: 500 },
    )
  }
}
