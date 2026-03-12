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
      <div className="h-dvh flex flex-col items-center justify-center px-8 bg-white relative overflow-hidden">
        {/* Vintage "Greetings from Austin Texas" postcard background */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-[0.16]">
          <svg viewBox="0 0 600 500" className="w-[130vw] sm:w-[140%] max-w-none" xmlns="http://www.w3.org/2000/svg">
            {/* Decorative border */}
            <rect x="20" y="20" width="560" height="460" rx="12" fill="none" stroke="#C41E24" strokeWidth="3" />
            <rect x="28" y="28" width="544" height="444" rx="8" fill="none" stroke="#C41E24" strokeWidth="1" />

            {/* "Greetings from" script */}
            <text x="300" y="135" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="52" fontWeight="400" fill="#C41E24">
              Greetings from
            </text>

            {/* "AUSTIN" big block letters */}
            <text x="300" y="270" textAnchor="middle" fontFamily="Georgia, serif" fontSize="155" fontWeight="900" fill="#C41E24" letterSpacing="8">
              AUSTIN
            </text>

            {/* Decorative line */}
            <line x1="120" y1="300" x2="480" y2="300" stroke="#C41E24" strokeWidth="2" />

            {/* "TEXAS" */}
            <text x="300" y="370" textAnchor="middle" fontFamily="Georgia, serif" fontSize="68" fontWeight="700" fill="#C41E24" letterSpacing="22">
              TEXAS
            </text>

            {/* Small star decorations */}
            <polygon points="300,400 303,410 314,410 305,416 308,426 300,420 292,426 295,416 286,410 297,410" fill="#C41E24" />
            <polygon points="180,395 182,401 188,401 183,405 185,411 180,407 175,411 177,405 172,401 178,401" fill="#C41E24" />
            <polygon points="420,395 422,401 428,401 423,405 425,411 420,407 415,411 417,405 412,401 418,401" fill="#C41E24" />
          </svg>
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center">
          <h1 className="font-serif font-black text-display text-black tracking-tight">
            SXSW
          </h1>
          <p className="font-serif font-bold text-heading text-red-brand mt-2 tracking-widest uppercase">
            Hot Takes
          </p>
          <p className="font-serif text-body text-black/40 mt-2">2026</p>
        </div>

        <div className="relative z-10 mt-16 w-full max-w-xs">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && startGame()}
            placeholder="Your name"
            className="w-full border-b-2 border-black/20 bg-transparent py-4 text-center font-serif text-heading outline-none placeholder:text-black/25 focus:border-red-brand transition-colors"
          />
          <button
            onClick={startGame}
            disabled={!name.trim()}
            className="mt-10 w-full bg-red-brand text-white font-serif font-bold text-heading py-4 rounded-full tracking-widest uppercase disabled:opacity-30 active:brightness-110 active:scale-[0.98] transition-all"
          >
            Start
          </button>
        </div>

        <div className="relative z-10 mt-10 w-full max-w-xs space-y-3">
          <div className="flex items-center justify-between bg-red-brand/5 border border-red-brand/15 rounded-full px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <span className="font-serif font-bold text-body text-black">Swipe right</span>
            </div>
            <span className="font-serif text-body text-red-brand font-semibold">It&apos;s fire</span>
          </div>
          <div className="flex items-center justify-between bg-black/[0.03] border border-black/10 rounded-full px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">😐</span>
              <span className="font-serif font-bold text-body text-black">Swipe left</span>
            </div>
            <span className="font-serif text-body text-black/60 font-semibold">It&apos;s mid</span>
          </div>
        </div>
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
        <p className="font-serif text-heading text-red-brand mt-4">
          {points} points earned
        </p>
        <a
          href="/leaderboard"
          className="mt-12 bg-black text-white font-serif font-bold text-heading py-4 px-12 rounded-full tracking-widest uppercase active:bg-red-brand active:scale-[0.98] transition-all"
        >
          Leaderboard
        </a>
        <button
          onClick={() => {
            setIndex(0)
            setPoints(0)
            setPhase('swiping')
          }}
          className="mt-6 font-serif text-body text-black/40 underline underline-offset-4"
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
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-serif font-bold text-body tracking-widest text-black/50">
          {index + 1}/{cards.length}
        </span>
        <span className="font-serif font-bold text-body text-red-brand">
          {points} pts
        </span>
      </div>

      {/* Card area */}
      <div className="flex-1 flex items-center justify-center px-6 pb-6 relative">
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
            className="absolute inset-x-6 bottom-10 bg-white border border-black/10 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-baseline mb-4">
              <span className="font-serif font-bold text-heading">
                {lastVote === 'fire' ? 'FIRE' : 'MID'}
              </span>
              <span className="font-serif font-bold text-display text-red-brand leading-none">
                {result.pct}%
              </span>
            </div>
            <div className="w-full h-2 bg-black/5 overflow-hidden rounded-full">
              <div
                className="h-full bg-red-brand result-bar rounded-full"
                style={{ width: `${result.pct}%` }}
              />
            </div>
            <p className="text-body text-black/40 mt-3">
              {result.total} vote{result.total !== 1 ? 's' : ''} &middot; {result.pct}% said fire
            </p>
          </motion.div>
        )}
      </div>

      {/* Bottom buttons */}
      <div className="flex gap-4 px-6 pb-10">
        <button
          onClick={() => vote('mid')}
          disabled={showResult}
          className="flex-1 border-2 border-black/15 py-4 rounded-full font-serif font-bold text-heading tracking-widest uppercase disabled:opacity-30 active:bg-black/5 active:scale-[0.98] transition-all"
        >
          Mid
        </button>
        <button
          onClick={() => vote('fire')}
          disabled={showResult}
          className="flex-1 bg-red-brand text-white py-4 rounded-full font-serif font-bold text-heading tracking-widest uppercase disabled:opacity-60 active:brightness-110 active:scale-[0.98] transition-all"
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
      className="relative w-full aspect-[3/4] max-h-[65dvh] rounded-3xl cursor-grab active:cursor-grabbing select-none overflow-hidden grain shadow-xl"
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
        className="absolute top-8 right-6 border-3 border-red-brand text-red-brand font-serif font-black text-heading px-5 py-2 rounded-xl rotate-12 swipe-indicator"
      >
        FIRE
      </motion.div>
      <motion.div
        style={{ opacity: midOpacity }}
        className="absolute top-8 left-6 border-3 border-white text-white font-serif font-black text-heading px-5 py-2 rounded-xl -rotate-12 swipe-indicator"
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
