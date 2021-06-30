import React, { useEffect, useState, FormEvent } from 'react'
import '../styles/Login.scss'
import { toast, Toaster } from 'react-hot-toast'
import api from '../services/api'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

import logo from '../assets/logo.svg'

export default function Login () {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [logged, setLogged] = useState(false)
  const [cookies, setCookie] = useCookies(['cookie-name'])
  const [loading, setLoading] = useState(true)

  const token = cookies.token
  useEffect(() => {
    async function Check () {
      try {
        await api.get('/user/check', {
          headers: {
            authorization: token
          }
        })
        setLogged(true)
      } catch (error) {
        setLogged(false)
        setLoading(false)
      }
    }
    Check()
  }, [token])

  async function handleSubmit (e: FormEvent) {
    e.preventDefault()
    try {
      const { data } = await api.post('/user/login', {
        email: email.toUpperCase(),
        password: password
      })
      if (data.adminToken) {
        setCookie('adminToken', data.adminToken, { maxAge: 86400 })
      }
      const token = data.token
      setCookie('token', token, { maxAge: 86400 })
      history.push('/main')
    } catch (error) {
      toast.error('Usuário ou senha incorretos')
    }
  }

  if (logged) {
    history.push('/main')
  }

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  }

  return (
        <div className="login-container">
            <Toaster
            position="top-left"
            reverseOrder={false}
            />
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="acs"></img>
                <input
                placeholder="Usuário"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <input
                placeholder="Senha"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
  )
}
