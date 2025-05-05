"use client"

import { useEffect, useState } from "react"

import { Player } from "@/data/models/Player"
import { differenceInSeconds, format, fromUnixTime } from "date-fns"
import Image from "next/image"
import Link from "next/link"

interface PlayerProfileCardProps {
  player: Player | null
}

function formatTime(seconds: number): string {
  const days = Math.floor(seconds / 86400)
  const hrs = Math.floor((seconds % 86400) / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const timeString = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  return days > 0 ? `${days}d ${timeString}` : timeString
}

function PlayerProfileCard({ player }: PlayerProfileCardProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0)

  useEffect(() => {
    if (!player?.last_online) return

    const lastOnlineDate = fromUnixTime(player.last_online)

    const updateElapsed = () => {
      const now = new Date()
      const diff = differenceInSeconds(now, lastOnlineDate)
      setElapsedSeconds(diff)
    }

    updateElapsed()
    const interval = setInterval(updateElapsed, 1000)

    return () => clearInterval(interval)
  }, [player?.last_online])

  if (!player) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4 text-gray-500">
        No player data available.
      </div>
    )
  }

  const flagCode = player.country?.split("/").pop()?.toLowerCase()

  return (
    <div className="flex max-w-3xl w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg md:flex-row">
      <div className="flex items-center justify-center p-4">
        <Image
          src={player.avatar || "https://avatar.iran.liara.run/public/boy"}
          alt={`${player.username} avatar`}
          width={100}
          height={100}
          className="rounded-full border border-gray-300"
        />
      </div>

      <div className="flex-1 p-4 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold flex items-center gap-1">
            {player.username}
            {player.country && (
              <Image
                src={`https://flagcdn.com/w20/${flagCode}.png`}
                alt="Country flag"
                width={20}
                height={15}
                className="rounded-sm"
              />
            )}
          </h2>
          <span className="text-gray-500">({player.title})</span>
          {player.verified && (
            <span className="text-blue-500">✔ Verified</span>
          )}
        </div>

        <div className="text-gray-600">
          League: {player.league || "no league"}
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            Status:{" "}
            <span className="capitalize font-medium">{player.status}</span>
          </div>
          <div>Streamer: {player.is_streamer ? "Yes" : "No"}</div>
          <div>Followers: {player.followers}</div>
        </div>

        <div className="text-gray-500">
          Joined: {format(fromUnixTime(player.joined), "yyyy-MM-dd HH:mm:ss")}
          <br />
          Last Online:{" "}
          {format(fromUnixTime(player.last_online), "yyyy-MM-dd HH:mm:ss")}
          <br />
          <br />
          <span className="text-gray-600 font-semibold">
            Time since last online: {formatTime(elapsedSeconds)}
          </span>
        </div>

        <Link
          href={player.url}
          target="_blank"
          className="mt-3 inline-block rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
        >
          View Profile on Chess.com
        </Link>
      </div>
    </div>
  )
}

export default PlayerProfileCard
