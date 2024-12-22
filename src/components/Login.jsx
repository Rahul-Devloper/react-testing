import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users/2'
      )
      setUser(data)
      setLoading(false)
    } catch (error) {
      setError(true)
    }
  }
  return (
    <div>
      <span>{user?.name}</span>
      <form>
        <input
          type='text'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={!email || !password}
          type='submit'
          onClick={(e) => handleLogin(e)}>
          {loading ? 'loading...' : 'Login'}
        </button>
        <span data-testid='error' hidden={!error} style={{ color: 'red' }}>
          Something is wrong
        </span>
      </form>
    </div>
  )
}

export default Login
