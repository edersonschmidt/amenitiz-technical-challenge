import { getAPIUrl } from "@/utils/getBaseUrl"

interface GMResponse {
  players: string[]
}

export async function fetchGrandmasters(): Promise<GMResponse> {
  const apiUrl = getAPIUrl()

  const res = await fetch(`${apiUrl}/grandmasters`, {
    next: { revalidate: 60 },
  })

  console.log("Grandmasters response:", res)

  if (!res.ok) {
    throw new Error("Error fetching grandmasters data")
  }

  const data = await res.json()
  if (!data || !data.players) {
    return { players: [] }
  }

  const players = data.players.map((player: string) => player)
  return { players }
}
