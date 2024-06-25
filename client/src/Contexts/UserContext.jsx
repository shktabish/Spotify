import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../utils/axios'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get('/user/user')
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
