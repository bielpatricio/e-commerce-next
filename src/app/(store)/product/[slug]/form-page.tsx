'use client'

import { AddToCartButton } from '@/components/add-to-card-button'
import { useShoppingCart } from '@/contexts/cart-context'
import { Product } from '@/data/types/products'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { X } from 'lucide-react'

import * as Toast from '@radix-ui/react-toast'
import { useState } from 'react'

interface Props {
  item: Product
}

const sizeOptions = ['P', 'M', 'G', 'GG']

const newItemFormSchema = z.object({
  sizeOption: z.enum(['P', 'M', 'G', 'GG']),
})

type newItemFormInput = z.infer<typeof newItemFormSchema>

export function FormPage({ item }: Props) {
  const { addNewItem } = useShoppingCart()
  const [isOpen, setIsOpen] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<newItemFormInput>({
    resolver: zodResolver(newItemFormSchema),
  })

  function handleAddProductToCart(data: newItemFormInput) {
    setIsOpen(true)
    addNewItem({ ...item, size: data.sizeOption })
  }

  return (
    <Toast.Provider swipeDirection="right">
      <form onSubmit={handleSubmit(handleAddProductToCart)}>
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>
          <Controller
            control={control}
            name="sizeOption"
            render={({ field }) => {
              return (
                <div className="flex gap-2">
                  {sizeOptions.map((option) => (
                    <button
                      type="button"
                      key={option}
                      value={option}
                      onClick={field.onChange}
                      className={`flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 ${
                        field.value === option ? 'bg-violet-500' : 'bg-zinc-800'
                      }  text-sm font-semibold ${
                        field.value !== option && 'enabled:hover:bg-zinc-700'
                      } hover:scale-110 focus:border-violet-500`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )
            }}
          />
          {errors.sizeOption?.message && (
            <span className="block font-semibold text-red-400">
              Selecione um tamanho
            </span>
          )}
        </div>

        <AddToCartButton />
      </form>
      <Toast.Root
        className="rounded-lg p-4 flex gap-4 items-center justify-center bg-emerald-600"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Toast.Title className="text-zinc-200 text-lg">
          {item.title} adicionado ao carrinho
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
