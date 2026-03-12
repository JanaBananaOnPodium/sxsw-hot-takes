export async function POST(req: Request) {
  const token = process.env.TG_BOT_TOKEN
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!token || !appUrl) {
    return Response.json({ error: 'Bot not configured' }, { status: 500 })
  }

  const { message } = await req.json()

  if (message?.text === '/start') {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text: 'SXSW HOT TAKES 2026\n\nSwipe right if it\'s fire. Left if it\'s mid.\nSee what SXSW actually thinks.',
        reply_markup: {
          inline_keyboard: [[
            { text: 'START SWIPING', web_app: { url: appUrl } },
          ]],
        },
      }),
    })
  }

  return Response.json({ ok: true })
}
