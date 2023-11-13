import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex(item => item.id === product.id)

    if (productInCartIndex >= 0) {
      // ? Deep clone
      const newCart = structuredClone(cart)
      newCart[productInCartIndex].quantity += 1
      setCart(newCart)
    } else {
      setCart(previousState => ([
        ...previousState,
        {
          ...product,
          quantity: 1
        }
      ]))
    }
  }

  const clearCart = () => setCart([])

  const removeFromCart = (product) => {
    setCart((previousState) => previousState.filter(item => item.id !== product.id))
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        clearCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
