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
    <div className="flex flex-col w-full gap-4">
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {players.map((player) => (
          <li
            key={player}
            className={`p-4 text-lg cursor-pointer transition shadow-sm hover:shadow-md rounded-xl ${
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
          className="p-2 text-gray-800 transition bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
          className="p-2 text-gray-800 transition bg-gray-200 rounded-lg cursor-pointer cursor-pointerfont-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default GrandmasterList
