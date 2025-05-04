"use client"

import { useEffect, useState } from "react"

import GrandmasterList from "@/app/components/grandmaster-list"
import { fetchGrandmasters } from "@/services/grandmasters"

export default function Home() {
  const [players, setPlayers] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const limit: number = 40

  useEffect(() => {
    const loadData = async () => {
      try {
        const { players, total } = await fetchGrandmasters({
          page: currentPage,
          limit,
        })
        setPlayers(players)
        setTotalPages(Math.ceil(total / limit))
      } catch (err) {
        console.error("Error fetching grandmasters:", err)
        setPlayers([])
      }
    }

    loadData()
  }, [currentPage])

  return (
    <main className="flex w-full px-4 py-10">
      <div className="w-1/3">
        <h1 className="mb-6 text-3xl font-bold text-center">Grandmasters</h1>
        <GrandmasterList
          players={players}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onSelectPlayer={setSelectedPlayer}
          selectedPlayer={selectedPlayer}
        />
      </div>
      <div className="flex-1">
        Selected Player: {selectedPlayer ? selectedPlayer : "None"}
      </div>
    </main>
  )
}
