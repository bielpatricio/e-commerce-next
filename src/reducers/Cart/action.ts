import { Product } from '@/data/types/products'

export enum ActionTypes {
  ADD_NEW_ITEM = 'ADD_NEW_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SUB_ITEM = 'SUB_ITEM',
  ADD_ITEM = 'ADD_ITEM',
  SUM_ITEM = 'SUM_ITEM',
  RESET_ALL = 'RESET_ALL',
}

export function resetAllAction() {
  return {
    type: ActionTypes.RESET_ALL,
  }
}
export function addItemAction(id: number, size: string) {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {
      id,
      size,
    },
  }
}
export function sumItemAction(id: number, size: string, quantity: number) {
  return {
    type: ActionTypes.SUM_ITEM,
    payload: {
      id,
      size,
      quantity,
    },
  }
}
export function addNewItemAction(item: Product) {
  return {
    type: ActionTypes.ADD_NEW_ITEM,
    payload: {
      item,
    },
  }
}
export function removeItemAction(id: number, size: string) {
  return {
    type: ActionTypes.REMOVE_ITEM,
    payload: {
      id,
      size,
    },
  }
}
export function subItemAction(id: number, size: string) {
  return {
    type: ActionTypes.SUB_ITEM,
    payload: {
      id,
      size,
    },
  }
}
