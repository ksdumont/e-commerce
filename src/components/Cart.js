import React, {useContext} from 'react'
import Context from '../Context'
import CartItem from './CartItem'

function Cart(props) {
  const context = useContext(Context)
  const {cart, removeFromCart, clearCart, checkOut} = context
  const cartKeys = Object.keys(cart || {})
  
  console.log(context)

  return (
    <>
      <div className="cart">
        <h3 className="title">Cart</h3>
        <br/>
        <div className="container">
          {cartKeys.length ? (
            <div>
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={removeFromCart}
                />
            ))}  
            <button 
              className="clear-cart-button" 
              onClick={clearCart}>Clear Cart</button>
              {" "}
              <button 
              className="checkout-cart-button" 
              onClick={checkOut}>Checkout</button>
            </div>

          ) 
          : (
            <div className="empty-cart">No item in Cart!</div>
)}
        </div>
        
      </div>
    </>
  )
}

export default Cart
