'use client'

import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

export interface NotificationProps {
  title?: string
  type: 'success' | 'error'
}

interface NotificationActionProps extends NotificationProps {
  isOpen: boolean
}

interface NotificationContextType {
  toastAction: NotificationActionProps
  showToast: ({ title, type }: NotificationProps) => void
  closeToast: () => void
}

export const NotificationContext = createContext({} as NotificationContextType)

interface NotificationProviderProps {
  children: ReactNode
}

const SUCCESS_TITLE = 'Produto adicionado ao carrinho'
const ERROR_TITLE = 'Produto removido do carrinho'

export function NotificationContextProvider({
  children,
}: NotificationProviderProps) {
  const [toastAction, setToastAction] = useState<NotificationActionProps>({
    isOpen: false,
    title: '',
    type: 'success',
  })

  function showToast({ title, type }: NotificationProps) {
    const textTitle = type === 'success' ? SUCCESS_TITLE : ERROR_TITLE
    setToastAction({ isOpen: true, title: title ?? textTitle, type })
  }

  function closeToast() {
    setToastAction({
      isOpen: false,
      title: '',
      type: 'success',
    })
  }

  const NotificationContextProps = useMemo(
    () => ({
      showToast,
      toastAction,
      closeToast,
    }),
    [showToast, toastAction, closeToast],
  )

  return (
    <NotificationContext.Provider value={NotificationContextProps}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)

  return context
}
