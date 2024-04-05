import React from 'react'
import { Navigate } from 'react-router'

export const PrivateRoute = ({children}) => {
  const getStorage = localStorage.getItem('pandora_user')

  if (!getStorage){
    return <Navigate to="/login"/>
  } else {
    return children
  }
}

export const RedirectLogin = ({children}) => {
    const getStorage = localStorage.getItem('pandora_user')

    if (getStorage){
      return <Navigate to="/"/>
    } else {
      return children
    }
}