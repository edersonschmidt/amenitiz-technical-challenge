import { getAPIUrl } from "@/utils/getBaseUrl"

interface GMResponse {
  players: string[]
  total: number
  page: number
  limit: number
}

interface GMProps {
  page: number
  limit: number
}

export async function fetchGrandmasters({
  page = 1,
  limit = 20,
}: GMProps): Promise<GMResponse> {
  const apiUrl = getAPIUrl()

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  const res = await fetch(`${apiUrl}/grandmasters?${params.toString()}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Error fetching grandmasters data")
  }

  const data = await res.json()
  if (!data || !data.players) {
    return { players: [], total: 0, page: 0, limit: 0 }
  }

  return {
    players: data.players,
    total: data.total,
    page,
    limit,
  }
}
