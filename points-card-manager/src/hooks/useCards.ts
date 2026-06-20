import { useState, useEffect } from 'react'
import type { Card } from '../types/card'

const STORAGE_KEY = 'pcards:cards'

function loadCards(): Card[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
}

export function useCards() {
  const [cards, setCards] = useState<Card[]>(loadCards)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
  }, [cards])

  const addCard = (name: string, merchant: string, barcodeImage: string) => {
    const card: Card = {
      id: uid(),
      name,
      merchant,
      barcodeImage,
      createdAt: Date.now(),
    }
    setCards(prev => [card, ...prev])
  }

  return { cards, addCard }
}
