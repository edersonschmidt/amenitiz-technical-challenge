interface GrandmasterListProps {
  players: string[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onSelectPlayer: (player: string) => void
  selectedPlayer: string | null
}

function GrandmasterList({
  players,
  totalPages,
  currentPage,
  onPageChange,
  onSelectPlayer,
  selectedPlayer,
}: GrandmasterListProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {players.map((player) => (
          <li
            key={player}
            className={`rounded-xl p-4 text-lg shadow-sm transition hover:shadow-md cursor-pointer ${
              selectedPlayer === player ? "bg-blue-400" : "bg-white"
            }`}
            onClick={() => onSelectPlayer(player)}
          >
            <span className="font-medium text-gray-500">{player}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="rounded-lg bg-gray-200 p-2 text-gray-800 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <span className="self-center text-sm text-gray-800">
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-lg bg-gray-200 p-2 text-gray-800 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default GrandmasterList
