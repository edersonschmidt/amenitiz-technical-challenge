"use client"

import { useEffect, useState } from "react"

import GrandmasterList from "@/app/components/grandmaster-list"
import PlayerProfileCard from "@/app/components/player-profile-card"
import { Player } from "@/data/models/Player"
import { fetchGrandmasters, getGrandmaster } from "@/services/grandmasters"

export default function Home() {
  const [players, setPlayers] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [playerData, setPlayerData] = useState<Player | null>(null)

  const limit: number = 20

  useEffect(() => {
    const loadList = async () => {
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

    loadList()
  }, [currentPage])

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getGrandmaster({
          username: selectedPlayer,
        })
        setPlayerData(data)
      } catch (err) {
        console.error("Error fetching grandmaster data", err)
        setPlayerData(null)
      }
    }

    if (selectedPlayer) {
      loadData()
    }
  }, [selectedPlayer])

  return (
    <main className="flex flex-col lg:flex-row w-full px-4 py-10">
      <div className="lg:w-1/3">
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
      <div className="flex flex-1 items-center justify-center mt-6 lg:mt-0">
        <PlayerProfileCard player={playerData} />
      </div>
    </main>
  )
}
