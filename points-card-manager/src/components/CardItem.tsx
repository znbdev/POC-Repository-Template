import type { Card } from '../types/card'

interface CardItemProps {
  card: Card
  onClick: () => void
}

export default function CardItem({ card, onClick }: CardItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm transition-shadow active:shadow-md"
    >
      <span className="mb-1 truncate text-sm font-semibold text-gray-900">
        {card.merchant}
      </span>
      <span className="mb-2 truncate text-xs text-gray-400">{card.name}</span>
      <img
        src={card.barcodeImage}
        alt={card.name}
        className="h-14 w-full rounded-lg object-contain"
      />
    </button>
  )
}
