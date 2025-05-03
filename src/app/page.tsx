import GrandmasterList from "@/app/components/grandmaster-list"
import { fetchGrandmasters } from "@/services/grandmasters"

export default async function Home() {
  const data = await fetchGrandmasters()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Lista de Grandmasters (GM)
      </h1>
      <GrandmasterList players={data.players} />
    </main>
  )
}
