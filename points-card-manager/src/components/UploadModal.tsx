import { useState, useRef } from 'react'

interface UploadModalProps {
  open: boolean
  onClose: () => void
  onSave: (name: string, merchant: string, barcodeImage: string) => void
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img
        const max = 800
        if (width > max) {
          height = (height / width) * max
          width = max
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.onerror = reject
      img.src = reader.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function UploadModal({ open, onClose, onSave }: UploadModalProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [merchant, setMerchant] = useState('')
  const [loading, setLoading] = useState(false)
  const cameraRef = useRef<HTMLInputElement>(null)
  const albumRef = useRef<HTMLInputElement>(null)

  if (!open) return null

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    setLoading(true)
    try {
      const dataUrl = await compressImage(file)
      setPreview(dataUrl)
    } catch {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
    setLoading(false)
  }

  const handleSave = () => {
    if (!preview || !name.trim() || !merchant.trim()) return
    onSave(name.trim(), merchant.trim(), preview)
    setPreview(null)
    setName('')
    setMerchant('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40 sm:items-center sm:justify-center">
      <div
        onClick={e => e.stopPropagation()}
        className="w-full rounded-t-2xl bg-white px-6 pb-8 pt-6 sm:max-w-md sm:rounded-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">添加积分卡</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={e => handleFile(e.target.files?.[0])}
          className="hidden"
        />
        <input
          ref={albumRef}
          type="file"
          accept="image/*"
          onChange={e => handleFile(e.target.files?.[0])}
          className="hidden"
        />

        {preview ? (
          <div className="mb-4 flex justify-center rounded-xl bg-gray-50 p-4">
            <img src={preview} alt="preview" className="h-28 rounded-lg object-contain" />
          </div>
        ) : (
          <div className="mb-4 grid grid-cols-2 gap-3">
            <button
              onClick={() => cameraRef.current?.click()}
              disabled={loading}
              className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-8 text-gray-400 transition-colors hover:border-gray-300 active:bg-gray-50"
            >
              <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
              <span className="text-sm">拍照</span>
            </button>
            <button
              onClick={() => albumRef.current?.click()}
              disabled={loading}
              className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-8 text-gray-400 transition-colors hover:border-gray-300 active:bg-gray-50"
            >
              <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
              <span className="text-sm">从相册选择</span>
            </button>
          </div>
        )}

        <div className="space-y-3">
          <input
            type="text"
            placeholder="商户名（如 山姆）"
            value={merchant}
            onChange={e => setMerchant(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-gray-400"
          />
          <input
            type="text"
            placeholder="卡名（如 山姆会员卡）"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-gray-400"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!preview || !name.trim() || !merchant.trim()}
          className="mt-5 w-full rounded-xl bg-black py-3 text-base font-medium text-white transition-opacity hover:opacity-80 active:opacity-70 disabled:opacity-30"
        >
          保存
        </button>
      </div>
    </div>
  )
}
