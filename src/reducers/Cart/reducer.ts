import { Product } from '@/data/types/products'
import { ActionTypes } from './action'

interface CartState {
  items: Product[]
}

export function cartReducer(state: CartState, action: any) {
  switch (action.type) {
    case ActionTypes.RESET_ALL:
      return {
        items: [],
      }

    case ActionTypes.ADD_NEW_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload.item],
      }

    case ActionTypes.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((coff) => coff.id !== action.payload.id),
      }

    case ActionTypes.SUB_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount: item.amount - 1,
            }
          }
          return item
        }),
      }
    case ActionTypes.ADD_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount: item.amount + 1,
            }
          }
          return item
        }),
      }
    case ActionTypes.SUM_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              amount: item.amount + action.payload.quantity,
            }
          }
          return item
        }),
      }
    default: {
      return state
    }
  }
}
