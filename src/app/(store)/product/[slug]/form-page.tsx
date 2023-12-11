'use client'

import { AddToCartButton } from '@/components/add-to-card-button'
import { useShoppingCart } from '@/contexts/cart-context'
import { Product } from '@/data/types/products'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNotification } from '@/hooks/useNotification'

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
  const { showToast } = useNotification()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<newItemFormInput>({
    resolver: zodResolver(newItemFormSchema),
  })

  function handleAddProductToCart(data: newItemFormInput) {
    showToast({
      title: `${item.title} adicionado ao carrinho`,
      type: 'success',
    })
    addNewItem({ ...item, size: data.sizeOption })
  }

  return (
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
  )
}
