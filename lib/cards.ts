export interface Card {
  id: string
  topic: string
  // Swap these with your own editorial photos
  image: string
  // Dark gradient fallback if image fails to load
  gradient: string
}

export const cards: Card[] = [
  {
    id: 'american-dynamism',
    topic: 'AMERICAN\nDYNAMISM',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 'protein',
    topic: 'PROTEIN',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #2d1b00 0%, #4a2c0a 50%, #1a0f00 100%)',
  },
  {
    id: 'peptides',
    topic: 'PEPTIDES',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #1d3461 100%)',
  },
  {
    id: 'agents-replacing-you',
    topic: 'AGENTS\nREPLACING YOU',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #0d0d0d 100%)',
  },
  {
    id: 'agents-enhancing-you',
    topic: 'AGENTS\nENHANCING YOU',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2a1a4e 100%)',
  },
  {
    id: 'crypto',
    topic: 'CRYPTO',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #0a0a2e 100%)',
  },
  {
    id: 'stablecoins',
    topic: 'STABLECOINS',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #0d1f0d 50%, #2a3a2a 100%)',
  },
  {
    id: 'politics',
    topic: 'POLITICS',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #0f0505 100%)',
  },
  {
    id: 'manufacturing',
    topic: 'MANUFACTURING',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a1a0a 0%, #2d2d15 50%, #0f0f05 100%)',
  },
  {
    id: 'war',
    topic: 'WAR',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)',
  },
  {
    id: 'sustainability',
    topic: 'SUSTAINABILITY',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #0a1a0a 0%, #153015 50%, #0d200d 100%)',
  },
  {
    id: 'parties',
    topic: 'PARTIES',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a0a1a 0%, #2d152d 50%, #0f050f 100%)',
  },
]
