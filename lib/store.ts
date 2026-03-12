// In-memory vote store — works for demos.
// For persistence, swap with Podium API calls or Upstash Redis.

interface VoteData {
  fire: number
  mid: number
}

interface LeaderboardEntry {
  userId: string
  name: string
  points: number
}

const votes = new Map<string, VoteData>()
const leaderboard = new Map<string, LeaderboardEntry>()

export function recordVote(cardId: string, vote: 'fire' | 'mid') {
  const current = votes.get(cardId) || { fire: 0, mid: 0 }
  current[vote]++
  votes.set(cardId, current)
  return current
}

export function getResults(cardId: string): VoteData {
  return votes.get(cardId) || { fire: 0, mid: 0 }
}

export function getAllResults(): Record<string, VoteData> {
  return Object.fromEntries(votes)
}

export function updateLeaderboard(userId: string, name: string, points: number) {
  const existing = leaderboard.get(userId)
  leaderboard.set(userId, {
    userId,
    name,
    points: existing ? existing.points + points : points,
  })
}

export function getLeaderboard(): LeaderboardEntry[] {
  return Array.from(leaderboard.values())
    .sort((a, b) => b.points - a.points)
    .slice(0, 50)
}
