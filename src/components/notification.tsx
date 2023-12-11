'use client'

import { useNotification } from '@/hooks/useNotification'
import * as Toast from '@radix-ui/react-toast'
import { X } from 'lucide-react'

export function Notification() {
  const { toastAction, closeToast } = useNotification()

  return (
    <>
      <Toast.Root
        className={`rounded-lg p-4 flex gap-4 items-center justify-center ${
          toastAction.type === 'error' ? 'bg-rose-400' : 'bg-emerald-600'
        }`}
        open={toastAction.isOpen}
        onOpenChange={closeToast}
      >
        <Toast.Title className="text-zinc-200 text-lg">
          {toastAction.title}
        </Toast.Title>
        <Toast.Action asChild altText="Fechar">
          <button>
            <X className="h-6 w-6 text-zinc-200" />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="absolute bottom-0 right-0 flex flex-col p-4 gap-2 max-w-[100vw] m-0 z-50 outline-none" />
    </>
  )
}
