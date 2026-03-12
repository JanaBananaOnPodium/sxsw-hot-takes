import { getLeaderboard } from '@/lib/store'

export async function GET() {
  return Response.json({ leaderboard: getLeaderboard() })
}
