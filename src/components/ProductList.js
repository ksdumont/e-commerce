import React, {useContext} from 'react'
import Context from '../Context'
import ProductItem from './ProductItem'

function ProductList() {
  const context = useContext(Context)
  const {products, addToCart} = context
  console.log(products)
  return (
    <>
      <div className="product-list">
        <h4 className="product-list-title">Our Products</h4>
        <br />
        <div className="product-list-items">
          {products && products.length ? (
            products.map((product,index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={addToCart}
              />  
            ))
          ) : (
            <div className="no-products">
              No Products Found!
            </div>  
          )
          }
        </div>
      </div>
    </>
  )
}

export default ProductList
