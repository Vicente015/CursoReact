import { type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export const Portal: React.FC<PropsWithChildren> = ({ children }) => {
  return createPortal(children, document.body)
}
