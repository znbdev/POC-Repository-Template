import type { Card } from '../types/card'

interface BarcodeViewerProps {
  card: Card
  onClose: () => void
}

export default function BarcodeViewer({ card, onClose }: BarcodeViewerProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="flex w-full max-w-lg flex-col items-center px-6"
      >
        <div className="mb-8 text-center">
          <p className="text-lg font-semibold text-white">{card.merchant}</p>
          <p className="mt-0.5 text-sm text-gray-400">{card.name}</p>
        </div>
        <img
          src={card.barcodeImage}
          alt={card.name}
          className="w-full rounded-xl"
        />
      </div>

      <button
        onClick={onClose}
        className="fixed right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
