import { NextResponse } from "next/server"

const API_URL = "https://api.chess.com/pub/titled/GM"

export async function GET() {
  try {
    const res = await fetch(API_URL)

    if (!res.ok) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      )
    }

    const data = await res.json()
    return NextResponse.json({ players: data.players })
  } catch (error) {
    return NextResponse.json(
      { error: `Internal error ${error}` },
      { status: 500 },
    )
  }
}
