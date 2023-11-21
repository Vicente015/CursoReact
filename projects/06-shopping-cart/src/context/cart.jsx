import { createContext, useReducer } from 'react'

const ACTION_TYPES = {
  ADD_TO_CART: 1,
  CLEAR_CART: 3,
  REMOVE_FROM_CART: 2
}

export const CartContext = createContext()

const initialCartState = JSON.parse(window.localStorage.getItem('cart')) || []
const updateLocalStorage = (state) => window.localStorage.setItem('cart', JSON.stringify(state))

const reducer = (state, action) => {
  const { payload: actionPayload, type: actionType } = action
  switch (actionType) {
    case ACTION_TYPES.ADD_TO_CART: {
      const productInCartIndex = state.findIndex(item => item.id === actionPayload.id)

      if (productInCartIndex >= 0) {
      // ? Deep clone
        const newCart = structuredClone(state)
        newCart[productInCartIndex].quantity += 1
        return newCart
      }
      const newState = [
        ...state,
        { ...actionPayload, quantity: 1 }
      ]
      updateLocalStorage(newState)
      return newState
    }

    case ACTION_TYPES.REMOVE_FROM_CART: {
      const newState = state.filter(item => item.id !== actionPayload.id)
      updateLocalStorage(newState)
      return newState
    }

    case ACTION_TYPES.CLEAR_CART: {
      const newState = []
      updateLocalStorage(newState)
      return newState
    }
  }

  updateLocalStorage(state)
}

export function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialCartState)

  const addToCart = (product) => dispatch({
    payload: product,
    type: ACTION_TYPES.ADD_TO_CART
  })

  const removeFromCart = (product) => dispatch({
    payload: product,
    type: ACTION_TYPES.REMOVE_FROM_CART
  })

  const clearCart = () => dispatch({
    type: ACTION_TYPES.CLEAR_CART
  })

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart: state,
        clearCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
