import React from "react"

interface GrandmasterListProps {
  players: string[]
}

function GrandmasterList({ players }: GrandmasterListProps) {
  return (
    <ul className="space-y-2">
      {players.map((player) => (
        <li
          key={player}
          className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <a
            href={`https://www.chess.com/member/${player}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {player}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default GrandmasterList
