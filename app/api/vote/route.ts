import { recordVote, updateLeaderboard, getResults } from '@/lib/store'

export async function POST(req: Request) {
  const { cardId, vote, userId, userName } = await req.json()

  if (!cardId || !vote || !userId) {
    return Response.json({ error: 'Missing fields' }, { status: 400 })
  }

  const results = recordVote(cardId, vote)
  updateLeaderboard(userId, userName || 'Anon', 1)

  const total = results.fire + results.mid
  return Response.json({
    fire: results.fire,
    mid: results.mid,
    total,
    pct: total > 0 ? Math.round((results.fire / total) * 100) : 0,
  })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const cardId = searchParams.get('cardId')

  if (!cardId) {
    return Response.json({ error: 'Missing cardId' }, { status: 400 })
  }

  const results = getResults(cardId)
  const total = results.fire + results.mid
  return Response.json({
    fire: results.fire,
    mid: results.mid,
    total,
    pct: total > 0 ? Math.round((results.fire / total) * 100) : 0,
  })
}
