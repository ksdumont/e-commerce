import React, {useState, useContext} from 'react'
import {Redirect} from "react-router-dom"
import Context from "../Context"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const context = useContext(Context)

  const login = (e) => {
    e.preventDefault()
    if (!username || !password) setError('Fill all fields please')
    context.login(username, password)
    .then((loggedIn) => {
      if (!loggedIn) setError("Invalid Credentials")
    })
 }
  
  return !context.user ? (
    <>
      <div className="login-page">
        <h1 className="login-title">Login</h1>
        <br /> 
        <br />
        <form onSubmit={login}>
          <div className="field">
            <label className="label">Email: </label>
            <input 
              className="input"
              type="email"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="label">Password: </label>
            <input 
              className="input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />  
          </div>
          {error && (
            <div className="error">{error}</div>
          )}
          <button className="button">Submit</button>
        </form>
      </div>
    </>
  ) : (
    <Redirect to="/products" />
  )
}  

export default Login
