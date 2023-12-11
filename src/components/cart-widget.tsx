'use client'

import { useShoppingCart } from '@/contexts/cart-context'
import { ShoppingBag } from 'lucide-react'
import * as Toast from '@radix-ui/react-toast'
import * as HoverCard from '@radix-ui/react-hover-card'
import Link from 'next/link'
import { useNotification } from '@/hooks/useNotification'
import { Notification } from './notification'

export function CartWidget() {
  const { items, total, removeItem } = useShoppingCart()

  const { showToast } = useNotification()

  function removeItemFromCart(id: number, size: string, title: string) {
    showToast({ title: `${title} removido do carrinho`, type: 'error' })
    removeItem(id, size)
  }

  return (
    <Toast.Provider swipeDirection="right">
      <HoverCard.Root>
        <HoverCard.Trigger
          asChild
          className="flex justify-center z-10 rounded-lg cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm">Cart ({items.length})</span>
          </div>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content
            sideOffset={5}
            className="bg-zinc-700 p-4 rounded-lg flex flex-col gap-6 w-auto"
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-6 m-0 px-2"
              >
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  className="text-md text-zinc-300 whitespace-nowrap font-bold flex gap-2"
                >
                  <span className="text-md text-violet-400 min-w-[28px]">
                    {item.amount}x
                  </span>
                  {item.title} ({item.size})
                </Link>
                <button
                  className="text-md text-rose-400 hover:underline"
                  onClick={() =>
                    removeItemFromCart(item.id, item.size, item.title)
                  }
                >
                  remover
                </button>
              </div>
            ))}
            {items.length > 0 ? (
              <span className="text-md text-emerald-600 w-full text-end font-semibold border-t-2 border-emerald-600 pt-4 pr-2">
                <span className="text-md text-zinc-300 w-full text-end font-semibold">
                  Total:{' '}
                </span>
                {total.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            ) : (
              <span className="text-md text-zinc-300 w-full text-end font-semibold whitespace-nowrap">
                Carrinho vazio
              </span>
            )}
            <HoverCard.Arrow className="fill-zinc-700" />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>

      <Notification />
    </Toast.Provider>
  )
}
