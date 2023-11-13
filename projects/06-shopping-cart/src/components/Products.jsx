import './Products.css'
import { useCart } from '../hooks/useCart.js'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'

export function Products ({ products }) {
  const { addToCart, cart, removeFromCart } = useCart()

  const checkProductInCart = product => cart.some(item => item.id === product.id)

  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map((product) => {
          const isProductInCart = checkProductInCart(product)
          return (
            <li key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.description}
              />
              <div>
                <strong>{product.title}</strong> - {product.price}
              </div>
              <div>
                <button
                  style={{
                    backgroundColor: isProductInCart ? 'indianred' : 'darkcyan'
                  }}
                  onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }}
                >
                  {
                    isProductInCart
                      ? <RemoveFromCartIcon />
                      : <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
