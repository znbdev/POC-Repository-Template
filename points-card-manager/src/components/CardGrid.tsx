import type { Card } from '../types/card'
import CardItem from './CardItem'

interface CardGridProps {
  cards: Card[]
  onCardClick: (card: Card) => void
}

export default function CardGrid({ cards, onCardClick }: CardGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 pb-24 pt-4 md:grid-cols-3 lg:grid-cols-4">
      {cards.map(card => (
        <CardItem
          key={card.id}
          card={card}
          onClick={() => onCardClick(card)}
        />
      ))}
    </div>
  )
}
