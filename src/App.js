import React, {useState, useEffect} from 'react';
import './App.css';
import {Switch, Route, Link, BrowserRouter as Router} from "react-router-dom"
import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import Login from './components/Login'
import ProductList from './components/ProductList'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Context from "./Context"


function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState({})
  const [products, setProducts] = useState([])
  
  let routerRef = React.createRef()

  useEffect(() => {
    let currentUser = localStorage.getItem("user")
    currentUser = currentUser ? JSON.parse(currentUser) : null;
    setUser(currentUser)
  }, [])
  
  const removeFromCart = () => {
    return null;
  }
  const addToCart = () => {
    return null;
  }
  const login = async (email, password) => {
    const res = await axios.post(
      'http://localhost:3001/login',
    {email, password},
    ).catch((res) => {
      return {status: 401, message: 'Unauthorized'}
    })
    if (res.status === 200) {
      const {email} = jwt_decode(res.data.accessToken)
      const currUser ={
        email, 
        token: res.data.accessToken,
        accessLevel: email === 'admin@example.com' ? 0 : 1
      }
      setUser(currUser)
      localStorage.setItem("user", JSON.stringify(currUser))
      return true;
    } else {
      return false;
    }
  }
  const logout = (e) => {
    e.preventDefault()
    setUser(null)
    localStorage.removeItem("user")
  }
  const addProduct = () => {
    return null;
  }
  const clearCart = () => {

  }
  const checkout = () => {

  }

  return (
    <Context.Provider value={{user, cart, products, removeFromCart, addToCart, login, addProduct, clearCart, checkout}}>
      <Router ref={routerRef}>
        <div className="App">
          <nav className="nav">
            <div className="navbar-brand">
              <b>Ecommerce</b>
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
                  Cart<span className="cart-total">{Object.keys(cart).length}</span>
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
            <Route exact path="/login" component={Login} />
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
