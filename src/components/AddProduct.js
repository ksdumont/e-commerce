import React, {useContext, useState} from 'react';
import Context from '../Context'
import {Redirect} from "react-router-dom"
import axios from "axios"

const initialState ={
  name: "",
  price: "",
  stock: "",
  shortDesc: "",
  description: "",
}

function AddProduct() {
  const [state, setState] = useState(initialState)
  const context = useContext(Context)

  let {name, price, stock, shortDesc, description} = state
  const {user} = context

  const save = async (e) => {
    e.preventDefault()
    if (name && price) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36)
      await axios.post('http://localhost:3001/products', {id, name, price, stock, shortDesc, description})
      context.addProduct({name, price, shortDesc, description, stock: stock || 0},
        () => setState(initialState))
        setState({flash: {status: 'is-success', msg: 'Product created successfully'}})
    }
    else {
      setState({flash: {status: 'is-danger', msg: 'Please enter a name and price'}})
    }
  }
  {  console.log(state)}
  return !(user && user.accessLevel < 1) ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className="add-product">
        <h4 className="add-product-title">Add Product</h4>
        <br />
        <br />
        <form onSubmit={save}>
          <div className="field">
            <label className="label">Product Name: </label>
            <input
              className="input"
              type="text"
              name="name"
              value={state.name}
              onChange={e => setState(prevState => ({
                ...prevState,
                name: e.target.value
              }))}
              required
            />
          </div>
            <div className="field">
            <label className="label">Price: </label>
            <input
              className="input"
              type="number"
              name="price"
              value={state.price}
              onChange={e => setState(prevState => ({
                ...prevState,
                price: e.target.value
              }))}
              required
            />
          </div>
            <div className="field">
            <label className="label">Available in Stock: </label>
            <input
              className="input"
              type="number"
              name="stock"
              value={state.stock}
              onChange={e => setState(prevState => ({
                ...prevState,
                stock: e.target.value
              }))}
            />
          </div>
            <div className="field">
            <label className="label">Short Description: </label>
            <input
              className="input"
              type="text"
              name="shortDesc"
              value={state.shortDesc}
              onChange={e => setState(prevState => ({
                ...prevState,
                shortDesc: e.target.value
              }))}
            />
          </div>
            <div className="field">
            <label className="label">Description: </label>
            <textarea
              className="textarea"
              type="text"
              rows="2"
              style={{resize: "none"}}
              name="description"
              value={state.description}
              onChange={e => setState(prevState => ({
                ...prevState,
                description: e.target.value
              }))}
            />
          </div>
          {state.flash && (
            <div className={`notification ${state.flash.status}`}>
              {state.flash.msg}
            </div>
          )}
          <button className="add-product-button" type="submit" onClick={save}>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default AddProduct
