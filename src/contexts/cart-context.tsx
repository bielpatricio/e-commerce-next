'use client'

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

import { cartReducer } from '../reducers/Cart/reducer'
import { Product } from '@/data/types/products'
import {
  addItemAction,
  addNewItemAction,
  removeItemAction,
  resetAllAction,
  subItemAction,
  sumItemAction,
} from '@/reducers/Cart/action'

interface ShoppingCartContextType {
  items: Product[]
  total: number
  addNewItem: (item: Product) => void
  removeItem: (id: number, size: string) => void
  addItem: (id: number, size: string) => void
  subItem: (id: number, size: string) => void
  resetAll: () => void
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType)

interface ShoppingCartProviderProps {
  children: ReactNode
}

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartProviderProps) {
  function getStoredCartItems() {
    // if (typeof window !== 'undefined') {
    //   const storedStateAsJSON = localStorage.getItem('@shirt:cart-State-1.0.0')

    //   if (storedStateAsJSON) {
    //     try {
    //       return JSON.parse(storedStateAsJSON)
    //     } catch (error) {
    //       console.error(error)
    //     }
    //   }
    // }
    return { items: [] }
  }

  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      items: [],
    },
    () => getStoredCartItems(),
  )

  const { items } = cartState

  const total = items.reduce((totalPrice, item) => {
    return totalPrice + item.amount * item.price
  }, 0)

  useEffect(() => {
    const stateJSON = JSON.stringify(cartState)
    localStorage.setItem('@shirt:cart-State-1.0.0', stateJSON)
  }, [cartState])

  function addNewItem(item: Product) {
    const tryFindItemOnCart = items.find(
      (i: Product) => i.id === item.id && i.size === item.size,
    )

    if (tryFindItemOnCart) {
      dispatch(
        sumItemAction(
          tryFindItemOnCart.id,
          tryFindItemOnCart.size,
          tryFindItemOnCart.amount,
        ),
      )
    } else {
      dispatch(addNewItemAction({ ...item, amount: 1 }))
    }
  }

  function removeItem(id: number, size: string) {
    dispatch(removeItemAction(id, size))
  }

  function resetAll() {
    dispatch(resetAllAction())
  }

  function addItem(id: number, size: string) {
    dispatch(addItemAction(id, size))
  }

  function subItem(id: number, size: string) {
    dispatch(subItemAction(id, size))
  }

  const ShoppingCartContextProps = useMemo(
    () => ({
      items,
      total,
      addNewItem,
      removeItem,
      addItem,
      subItem,
      resetAll,
    }),
    [items, total, addNewItem, removeItem, addItem, subItem, resetAll],
  )

  return (
    <ShoppingCartContext.Provider value={ShoppingCartContextProps}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext)

  return context
}
