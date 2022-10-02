import {LoginPage} from './pages/login-page'
import {DashboardPage} from './pages/dashboard-page'

export const routes = [
  {
    path: '/',
    Component: LoginPage,
    isExact: true,
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
    isPrivate: true,
  },
]
