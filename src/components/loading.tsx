import React from "react"

interface LoadingProps {
  className?: string
}

function Loading({ className }: LoadingProps) {
  return (
    <div
      role="status"
      className={`flex justify-center items-center ${className || ""}`}
    >
      <span className="loading loading-infinity text-secondary loading-lg"></span>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Loading
