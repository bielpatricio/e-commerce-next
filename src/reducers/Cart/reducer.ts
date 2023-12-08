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
        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id && item.size === action.payload.size
            ),
        ),
      }

    case ActionTypes.SUB_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (
            item.id === action.payload.id &&
            item.size === action.payload.size
          ) {
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
          if (
            item.id === action.payload.id &&
            item.size === action.payload.size
          ) {
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
          if (
            item.id === action.payload.id &&
            item.size === action.payload.size
          ) {
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
