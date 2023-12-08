'use client'

import { useShoppingCart } from '@/contexts/cart-context'
import { ShoppingBag, X } from 'lucide-react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Toast from '@radix-ui/react-toast'
import { useState } from 'react'

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
      <NavigationMenu.Root className="relative flex justify-center z-10 rounded-lg">
        <NavigationMenu.List className="flex justify-center p-1 rounded-lg list-none shadow m-0">
          <NavigationMenu.Item>
            {/* <NavigationMenu.Trigger className="py-1 px-2 outline-none select-none"> */}
            <NavigationMenu.Trigger className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="text-sm">Cart ({items.length})</span>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="absolute top-10 right-1 bg-zinc-700 p-4 rounded-lg flex flex-col gap-6 w-auto">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-6 m-0 px-2"
                >
                  <span className="text-md text-zinc-300 whitespace-nowrap font-bold flex gap-2">
                    <span className="text-md text-violet-400 min-w-[28px]">
                      {item.amount}x
                    </span>
                    {item.title} ({item.size})
                  </span>
                  {/* <span className="text-sm text-center">-</span>
                  <span className="text-sm text-center">{item.size}</span> */}
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
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>

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
