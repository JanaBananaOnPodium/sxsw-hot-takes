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
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 'protein',
    topic: 'PROTEIN',
    image: '/images/protein.webp',
    gradient: 'linear-gradient(135deg, #2d1b00 0%, #4a2c0a 50%, #1a0f00 100%)',
  },
  {
    id: 'peptides',
    topic: 'PEPTIDES',
    image: '/images/peptides.jpg',
    gradient: 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #1d3461 100%)',
  },
  {
    id: 'agents-replacing-you',
    topic: 'AGENTS\nREPLACING YOU',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #0d0d0d 100%)',
  },
  {
    id: 'agents-enhancing-you',
    topic: 'AGENTS\nENHANCING YOU',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2a1a4e 100%)',
  },
  {
    id: 'crypto',
    topic: 'CRYPTO',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #0a0a2e 100%)',
  },
  {
    id: 'stablecoins',
    topic: 'STABLECOINS',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a2a1a 0%, #0d1f0d 50%, #2a3a2a 100%)',
  },
  {
    id: 'politics',
    topic: 'POLITICS',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #0f0505 100%)',
  },
  {
    id: 'manufacturing',
    topic: 'MANUFACTURING',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a1a0a 0%, #2d2d15 50%, #0f0f05 100%)',
  },
  {
    id: 'war',
    topic: 'WAR',
    image: 'https://images.unsplash.com/photo-1580752300992-559f8e0734e0?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)',
  },
  {
    id: 'sustainability',
    topic: 'SUSTAINABILITY',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #0a1a0a 0%, #153015 50%, #0d200d 100%)',
  },
  {
    id: 'parties',
    topic: 'PARTIES',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    gradient: 'linear-gradient(135deg, #1a0a1a 0%, #2d152d 50%, #0f050f 100%)',
  },
]
