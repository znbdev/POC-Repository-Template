import { useState } from 'react'
import { useCards } from '../hooks/useCards'
import type { Card } from '../types/card'
import CardGrid from '../components/CardGrid'
import EmptyState from '../components/EmptyState'
import BarcodeViewer from '../components/BarcodeViewer'
import UploadModal from '../components/UploadModal'

export default function HomePage() {
  const { cards, addCard } = useCards()
  const [showUpload, setShowUpload] = useState(false)
  const [viewing, setViewing] = useState<Card | null>(null)

  return (
    <div className="mx-auto min-h-dvh max-w-5xl bg-gray-50">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 pb-3 pl-4 pt-4 backdrop-blur">
        <h1 className="text-xl font-bold text-gray-900">积分卡</h1>
        <p className="mt-0.5 text-xs text-gray-400">
          共 {cards.length} 张卡
        </p>
      </header>

      {cards.length === 0 ? (
        <EmptyState onUpload={() => setShowUpload(true)} />
      ) : (
        <CardGrid cards={cards} onCardClick={card => setViewing(card)} />
      )}

      <button
        onClick={() => setShowUpload(true)}
        className="fixed bottom-6 right-6 z-30 flex size-14 items-center justify-center rounded-full bg-black text-white shadow-lg transition-transform active:scale-90"
      >
        <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      {viewing && (
        <BarcodeViewer card={viewing} onClose={() => setViewing(null)} />
      )}

      <UploadModal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        onSave={(name, merchant, barcodeImage) => {
          addCard(name, merchant, barcodeImage)
        }}
      />
    </div>
  )
}
