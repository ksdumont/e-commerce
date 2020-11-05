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

  const save = async (e) => {
    e.preventDefault()
    const {name, price, stock, shortDesc, description} = state
    if (name && price) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36)
      await axios.post('http://localhost:3001/products', {id, name, price, stock, shortDesc, description})
      context.AddProduct({name, price, shortDesc, description, stock: stock || 0},
        () => setState(initialState))
        setState({flash: {status: 'is-success', msg: 'Product created successfully'}})
    }
    else {
      setState({flash: {status: 'is-danger', msg: 'Please enter a name and price'}})
    }
  }
  // Handle Change

  return (
    <>
      AddProduct
    </>
  )
}

export default AddProduct
