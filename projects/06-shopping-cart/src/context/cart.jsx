import { createContext, useReducer } from 'react'

const ActionTypes = {
  ADD_TO_CART: 1,
  CLEAR_CART: 3,
  REMOVE_FROM_CART: 2
}

export const CartContext = createContext()

// todo: DEBERES: recuperar estado de localStorage
const initialState = []
const reducer = (state, action) => {
  const { payload: actionPayload, type: actionType } = action
  switch (actionType) {
    case ActionTypes.ADD_TO_CART: {
      const productInCartIndex = state.findIndex(item => item.id === actionPayload.id)

      if (productInCartIndex >= 0) {
      // ? Deep clone
        const newCart = structuredClone(state)
        newCart[productInCartIndex].quantity += 1
        return newCart
      }
      return [
        ...state,
        { ...actionPayload, quantity: 1 }
      ]
    }

    case ActionTypes.REMOVE_FROM_CART: {
      return state.filter(item => item.id !== actionPayload.id)
    }

    case ActionTypes.CLEAR_CART: {
      return initialState
    }
  }
}

export function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (product) => dispatch({
    payload: product,
    type: ActionTypes.ADD_TO_CART
  })

  const removeFromCart = (product) => dispatch({
    payload: product,
    type: ActionTypes.REMOVE_FROM_CART
  })

  const clearCart = () => dispatch({
    type: ActionTypes.CLEAR_CART
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
