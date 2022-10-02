import React from 'react'
import PropTypes from 'prop-types'
import {Navigate} from 'react-router-dom'

import {AuthContext} from '../contexts/auth-context'

export const PrivateRoute = ({children}) => {
  const {isAuth} = React.useContext(AuthContext)

  if (!isAuth) {
    return <Navigate to="/" replace />
  }

  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
