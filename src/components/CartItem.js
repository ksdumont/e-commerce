import React from 'react'

function CartItem({cartItem, cartKey, removeFromCart}) {
  const {product, amount} = cartItem
  return (
    <div className="cart-item">
      <figure className="image is-64x64">
          <img
            src="https://bulma.io/images/placeholders/128x128.png"
            alt={product.shortDesc}
          />
      </figure>
      <div className="content">
        <b>{product.name.toUpperCase()}{"  "}
          <span>${product.price}</span>
        </b>
        <div>{product.shortDesc}</div>
        <small>{`${amount} in cart`}</small>
        <button onClick={() => removeFromCart(cartKey)}>Delete</button>
      </div>
    </div>
  )
}

export default CartItem
