import React from 'react';

function ProductItem({product, addToCart}) {
  return (
    <div className="product-item">
      <div className="media">
        <img src="https://bulma.io/images/placeholders/128x128.png" alt={product.shortDesc}
        />
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name.toUpperCase()}{" "}
          <span className="product-price">${product.price}</span>
        </h3>
        <div className="product-desc">{product.shortDesc}</div>
        {product.stock > 0 ? (
          <small>{product.stock + " Available"}</small>
        ) : (
          <small>Out of Stock</small>
        )}
        <div className="add-to-cart">
          <button className="add-to-cart-button" 
                  onClick={() => addToCart({
                    id: product.name, 
                    product, 
                    amount: 1
                  })}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
