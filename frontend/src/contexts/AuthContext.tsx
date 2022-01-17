import React, { createContext, useState } from 'react'
import api from '../services/api'
import { setCookie } from 'nookies'
import Router from 'next/router'

interface IAuthContext {
    isAuthenticated: boolean
    SignIn: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext({} as IAuthContext)

function AuthProvider ({ children }) {
  const [token, setToken] = useState('')

  const isAuthenticated = !!token

  async function SignIn (email: string, password: string) {
    const { data } = await api.post('/user/login', {
      email,
      password
    })

    setCookie(undefined, 'token', data, {
      maxAge: 86400 // 1 Day
    })

    api.defaults.headers.common.authorization = `Bearer ${data}`

    setToken(data)

    Router.push('/')
  }

  return (
        <AuthContext.Provider value={{ isAuthenticated, SignIn }}>
            {children}
        </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
