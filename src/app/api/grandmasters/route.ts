import { NextRequest, NextResponse } from "next/server"

const API_URL = "https://api.chess.com/pub/titled/GM"

const CACHE_DURATION = 1000 * 60 * 60 // cache for 1 hour

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "20", 10)

  try {
    const res = await fetch(API_URL, {
      next: { revalidate: CACHE_DURATION },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      )
    }

    const data = await res.json()
    const players: string[] = data.players || []

    const start = (page - 1) * limit
    const end = start + limit
    const playersByPage = players.slice(start, end)

    return NextResponse.json({
      players: playersByPage,
      total: players.length,
      page,
      limit,
    })
  } catch (error) {
    return NextResponse.json(
      { error: `Internal error ${error}` },
      { status: 500 },
    )
  }
}
