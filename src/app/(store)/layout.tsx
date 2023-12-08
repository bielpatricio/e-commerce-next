import { Header } from '@/components/header'
import { ShoppingCartContextProvider } from '@/contexts/cart-context'
import { ReactNode } from 'react'
import * as Toast from '@radix-ui/react-toast'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <ShoppingCartContextProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-5 px-8 py-8">
        <Header />
        {children}
      </div>
    </ShoppingCartContextProvider>
  )
}
