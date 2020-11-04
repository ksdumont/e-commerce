import React, {useState, useContext} from 'react';
import './App.css';
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom"
import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import Login from './components/Login'
import ProductList from './components/ProductList'

import Context from "./Context"
import { router } from 'json-server';

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState({})
  const [products, setProducts] = useState([])
  
  let routerRef = React.createRef()
  
  const removeFromCart = () => {
    return null;
  }
  const addToCart = () => {
    return null;
  }
  const login = () => {
    return null;
  }
  const addProduct = () => {
    return null;
  }
  const clearCart = () => {

  }
  const checkout = () => {

  }
  const logout = () => {

  }
  return (
    <Context.Provider value={{user, cart, products, removeFromCart, addToCart, login, addProduct, clearCart, checkout}}>
      <Router ref={routerRef}>
        <div className="App">
          <nav className="nav">
            <div className="navbar-brand">
              <b>ecommerce</b>
            </div>
            <div className="navbar-menu">
              <Link to="/products" className="navbar-item">
                Products
              </Link>
              {user && user.accessLevel < 1 && (
                <Link to="/add-product" className="navbar-item">
                  Add Product
                </Link>
              )}
                <Link to="/cart" className="navbar-item">
                  Cart<span>{Object.keys(cart).length}</span>
                </Link>
                {!user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>
                ):(
                  <Link to="/" onClick={logout} className="navbar-item">
                    Logout
                  </Link>
                )}
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/login" component={login} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/add-product" component={addProduct} />
            <Route exact path="/products" component={ProductList} />
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
