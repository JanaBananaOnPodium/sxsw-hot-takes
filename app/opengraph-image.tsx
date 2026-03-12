import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SXSW HOT or NOT — Insider Leaderboard'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Vintage postcard border */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: '4px solid rgba(196, 30, 36, 0.15)',
            borderRadius: 16,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 34,
            left: 34,
            right: 34,
            bottom: 34,
            border: '1.5px solid rgba(196, 30, 36, 0.1)',
            borderRadius: 10,
            display: 'flex',
          }}
        />

        {/* Background watermark text */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.06,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontStyle: 'italic',
              color: '#C41E24',
              fontFamily: 'Georgia, serif',
            }}
          >
            Greetings from
          </div>
          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: '#C41E24',
              fontFamily: 'Georgia, serif',
              letterSpacing: 8,
              marginTop: -10,
            }}
          >
            AUSTIN
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: '#C41E24',
              fontFamily: 'Georgia, serif',
              letterSpacing: 20,
              marginTop: -10,
            }}
          >
            TEXAS
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: '#000000',
              fontFamily: 'Georgia, serif',
              letterSpacing: -2,
            }}
          >
            SXSW
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#C41E24',
              fontFamily: 'Georgia, serif',
              letterSpacing: 6,
              marginTop: 4,
            }}
          >
            HOT or NOT
          </div>
          <div
            style={{
              fontSize: 24,
              color: 'rgba(0,0,0,0.4)',
              fontFamily: 'Georgia, serif',
              marginTop: 16,
              letterSpacing: 4,
            }}
          >
            INSIDER LEADERBOARD
          </div>
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(196, 30, 36, 0.06)',
                border: '1.5px solid rgba(196, 30, 36, 0.15)',
                borderRadius: 999,
                padding: '12px 28px',
                fontSize: 20,
                fontFamily: 'Georgia, serif',
              }}
            >
              <span>🔥</span>
              <span style={{ fontWeight: 700, color: '#C41E24' }}>Swipe right</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(0,0,0,0.03)',
                border: '1.5px solid rgba(0,0,0,0.1)',
                borderRadius: 999,
                padding: '12px 28px',
                fontSize: 20,
                fontFamily: 'Georgia, serif',
              }}
            >
              <span>😐</span>
              <span style={{ fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>Swipe left</span>
            </div>
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            fontSize: 18,
            color: 'rgba(0,0,0,0.3)',
            fontFamily: 'Georgia, serif',
            letterSpacing: 2,
          }}
        >
          sxswhotornot.com
        </div>
      </div>
    ),
    { ...size }
  )
}
