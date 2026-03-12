'use client'

import { useState, useEffect } from 'react'

interface Entry {
  userId: string
  name: string
  points: number
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((d) => setEntries(d.leaderboard || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-dvh bg-white px-5 py-8">
      <a href="/" className="font-serif text-body text-black/40 underline">
        &larr; Back
      </a>

      <h1 className="font-serif font-black text-display text-black mt-6">
        LEADER&shy;BOARD
      </h1>
      <p className="font-serif text-body text-red-brand mt-1 tracking-widest uppercase">
        SXSW Hot Takes 2026
      </p>

      <div className="mt-8 no-scrollbar">
        {loading ? (
          <p className="font-serif text-body text-black/40">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="font-serif text-body text-black/40">No votes yet. Be the first.</p>
        ) : (
          <ol className="space-y-0">
            {entries.map((entry, i) => (
              <li
                key={entry.userId}
                className="flex items-baseline justify-between py-4 border-b border-black/10"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={`font-serif font-black text-heading w-8 ${
                      i === 0
                        ? 'text-red-brand'
                        : i < 3
                          ? 'text-black'
                          : 'text-black/40'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="font-serif font-bold text-heading">
                    {entry.name}
                  </span>
                </div>
                <span className="font-serif font-bold text-heading text-red-brand">
                  {entry.points}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
