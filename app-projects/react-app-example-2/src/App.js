import React from 'react'

import {AppRouter} from './components/app-router'
import {AuthGuard} from './components/auth-guard'

const App = () => (
  <AuthGuard>
    <AppRouter />
  </AuthGuard>
)

export default App
