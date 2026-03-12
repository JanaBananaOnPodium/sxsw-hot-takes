'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { cards } from '@/lib/cards'

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void
        expand: () => void
        initDataUnsafe?: { user?: { id: number; first_name: string } }
      }
    }
  }
}

interface Result {
  fire: number
  mid: number
  total: number
  pct: number
}

export default function Home() {
  const [phase, setPhase] = useState<'intro' | 'swiping' | 'done'>('intro')
  const [index, setIndex] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [lastVote, setLastVote] = useState<'fire' | 'mid' | null>(null)
  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [points, setPoints] = useState(0)
  const [imgError, setImgError] = useState<Set<string>>(new Set())

  // Init user — TG or browser
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg?.initDataUnsafe?.user) {
      tg.ready()
      tg.expand()
      const u = tg.initDataUnsafe.user
      setName(u.first_name)
      setUserId(`tg-${u.id}`)
    } else {
      const stored = localStorage.getItem('sxsw-user')
      if (stored) {
        const { name: n, id } = JSON.parse(stored)
        setName(n)
        setUserId(id)
      }
    }
  }, [])

  const startGame = () => {
    if (!name.trim()) return
    if (!userId) {
      const id = `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      setUserId(id)
      localStorage.setItem('sxsw-user', JSON.stringify({ name: name.trim(), id }))
    }
    setPhase('swiping')
  }

  const vote = useCallback(
    async (direction: 'fire' | 'mid') => {
      if (showResult) return
      const card = cards[index]
      setLastVote(direction)

      try {
        const res = await fetch('/api/vote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cardId: card.id, vote: direction, userId, userName: name }),
        })
        const data = await res.json()
        setResult(data)
      } catch {
        setResult({ fire: direction === 'fire' ? 1 : 0, mid: direction === 'mid' ? 1 : 0, total: 1, pct: direction === 'fire' ? 100 : 0 })
      }

      setPoints((p) => p + 1)
      setShowResult(true)

      setTimeout(() => {
        setShowResult(false)
        setResult(null)
        setLastVote(null)
        if (index + 1 >= cards.length) {
          setPhase('done')
        } else {
          setIndex((i) => i + 1)
        }
      }, 2000)
    },
    [index, showResult, userId, name],
  )

  // ─── INTRO ───
  if (phase === 'intro') {
    return (
      <div className="h-dvh flex flex-col items-center justify-center px-8 bg-white">
        <div className="text-center">
          <h1 className="font-serif font-black text-display text-black tracking-tight">
            SXSW
          </h1>
          <p className="font-serif font-bold text-heading text-red-brand mt-1 tracking-widest uppercase">
            Hot Takes
          </p>
          <p className="font-serif text-body text-black/50 mt-1">2026</p>
        </div>

        <div className="mt-12 w-full max-w-xs">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && startGame()}
            placeholder="Your name"
            className="w-full border-b-2 border-black bg-transparent py-3 text-center font-serif text-heading outline-none placeholder:text-black/30 focus:border-red-brand"
          />
          <button
            onClick={startGame}
            disabled={!name.trim()}
            className="mt-8 w-full bg-black text-white font-serif font-bold text-heading py-4 tracking-widest uppercase disabled:opacity-30 active:bg-red-brand transition-colors"
          >
            Start
          </button>
        </div>

        <p className="mt-8 text-body text-black/40 text-center max-w-xs">
          Swipe right if it&apos;s <span className="text-red-brand font-semibold">fire</span>. Left if it&apos;s mid.
        </p>
      </div>
    )
  }

  // ─── DONE ───
  if (phase === 'done') {
    return (
      <div className="h-dvh flex flex-col items-center justify-center px-8 bg-white">
        <h1 className="font-serif font-black text-display text-black text-center">
          YOU&apos;RE DONE
        </h1>
        <p className="font-serif text-heading text-red-brand mt-2">
          {points} points earned
        </p>
        <a
          href="/leaderboard"
          className="mt-10 bg-black text-white font-serif font-bold text-heading py-4 px-12 tracking-widest uppercase active:bg-red-brand transition-colors"
        >
          Leaderboard
        </a>
        <button
          onClick={() => {
            setIndex(0)
            setPoints(0)
            setPhase('swiping')
          }}
          className="mt-4 font-serif text-body text-black/50 underline"
        >
          Swipe again
        </button>
      </div>
    )
  }

  // ─── SWIPING ───
  const card = cards[index]

  return (
    <div className="h-dvh flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-serif font-bold text-body tracking-widest">
          {index + 1}/{cards.length}
        </span>
        <span className="font-serif font-bold text-body text-red-brand">
          {points} pts
        </span>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-5 pb-5 relative">
        <SwipeCard
          key={card.id}
          card={card}
          imgFailed={imgError.has(card.id)}
          onImgError={() => setImgError((s) => new Set(s).add(card.id))}
          onVote={vote}
          disabled={showResult}
        />

        {/* Result overlay */}
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-5 bottom-8 bg-white border-2 border-black p-6"
          >
            <div className="flex justify-between items-baseline mb-3">
              <span className="font-serif font-bold text-heading">
                {lastVote === 'fire' ? 'FIRE' : 'MID'}
              </span>
              <span className="font-serif font-bold text-display text-red-brand leading-none">
                {result.pct}%
              </span>
            </div>
            <div className="w-full h-3 bg-black/10 overflow-hidden">
              <div
                className="h-full bg-red-brand result-bar"
                style={{ width: `${result.pct}%` }}
              />
            </div>
            <p className="text-body text-black/50 mt-2">
              {result.total} vote{result.total !== 1 ? 's' : ''} &middot; {result.pct}% said fire
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom buttons */}
      <div className="flex gap-4 px-5 pb-8">
        <button
          onClick={() => vote('mid')}
          disabled={showResult}
          className="flex-1 border-2 border-black py-4 font-serif font-bold text-heading tracking-widest uppercase disabled:opacity-30 active:bg-black/5 transition-colors"
        >
          Mid
        </button>
        <button
          onClick={() => vote('fire')}
          disabled={showResult}
          className="flex-1 bg-red-brand text-white py-4 font-serif font-bold text-heading tracking-widest uppercase disabled:opacity-60 active:brightness-110 transition-colors"
        >
          Fire
        </button>
      </div>
    </div>
  )
}

// ─── SWIPE CARD ───

function SwipeCard({
  card,
  imgFailed,
  onImgError,
  onVote,
  disabled,
}: {
  card: (typeof cards)[number]
  imgFailed: boolean
  onImgError: () => void
  onVote: (v: 'fire' | 'mid') => void
  disabled: boolean
}) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const fireOpacity = useTransform(x, [0, 100], [0, 1])
  const midOpacity = useTransform(x, [-100, 0], [1, 0])

  return (
    <motion.div
      drag={disabled ? false : 'x'}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      style={{ x, rotate, backgroundImage: card.gradient }}
      onDragEnd={(_, info) => {
        if (disabled) return
        if (info.offset.x > 80) {
          animate(x, 500, { duration: 0.3 })
          onVote('fire')
        } else if (info.offset.x < -80) {
          animate(x, -500, { duration: 0.3 })
          onVote('mid')
        } else {
          animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 })
        }
      }}
      className="relative w-full aspect-[3/4] max-h-[65dvh] cursor-grab active:cursor-grabbing select-none overflow-hidden grain"
    >
      {/* Photo */}
      {!imgFailed && (
        <img
          src={card.image}
          alt={card.topic}
          onError={onImgError}
          className="absolute inset-0 w-full h-full object-cover card-image"
          draggable={false}
        />
      )}

      {/* Dark overlay for text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

      {/* Swipe indicators */}
      <motion.div
        style={{ opacity: fireOpacity }}
        className="absolute top-6 right-6 border-3 border-red-brand text-red-brand font-serif font-black text-heading px-4 py-2 rotate-12 swipe-indicator"
      >
        FIRE
      </motion.div>
      <motion.div
        style={{ opacity: midOpacity }}
        className="absolute top-6 left-6 border-3 border-white text-white font-serif font-black text-heading px-4 py-2 -rotate-12 swipe-indicator"
      >
        MID
      </motion.div>

      {/* Topic label — magazine cover style */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <h2 className="font-serif font-black text-display text-white text-center whitespace-pre-line drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          {card.topic}
        </h2>
      </div>

      {/* Grain is applied via .grain::after in CSS */}
    </motion.div>
  )
}
