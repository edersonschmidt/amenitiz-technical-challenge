import { Player } from "@/data/models/Player"
import { getAPIUrl } from "@/utils/getBaseUrl"

interface GMProps {
  username: string | null
}

export async function getGrandmaster({ username }: GMProps): Promise<Player> {
  const apiUrl = getAPIUrl()

  if (!username) {
    throw new Error("Username is required")
  }

  const params = new URLSearchParams({
    username: username.toString(),
  })

  const res = await fetch(`${apiUrl}/grandmaster?${params.toString()}`, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Error fetching grandmaster data")
  }

  const data = await res.json()

  if (!data) {
    throw new Error("Invalid data format")
  }

  return data as Player
}
