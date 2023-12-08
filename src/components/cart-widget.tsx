'use client'

import { useShoppingCart } from '@/contexts/cart-context'
import { ShoppingBag, X } from 'lucide-react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Toast from '@radix-ui/react-toast'
import * as HoverCard from '@radix-ui/react-hover-card'
import { useState } from 'react'
import Link from 'next/link'

export function CartWidget() {
  const { items, total, removeItem } = useShoppingCart()
  const [toastAction, setToastAction] = useState({
    isOpen: false,
    title: '',
  })

  function removeItemFromCart(id: number, size: string, title: string) {
    setToastAction({ isOpen: true, title })
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

      <Toast.Root
        className="rounded-lg p-4 flex gap-4 items-center justify-center bg-rose-400"
        open={toastAction.isOpen}
        onOpenChange={() =>
          setToastAction({
            isOpen: false,
            title: '',
          })
        }
      >
        <Toast.Title className="text-zinc-200 text-lg">
          {toastAction.title} removido do carrinho
        </Toast.Title>
        <Toast.Action asChild altText="Fechar">
          <button>
            <X className="h-6 w-6 text-zinc-200" />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="absolute bottom-0 right-0 flex flex-col p-4 gap-2 max-w-[100vw] m-0 z-50 outline-none" />
    </Toast.Provider>
  )
}
