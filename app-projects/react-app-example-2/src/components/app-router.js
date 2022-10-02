import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {routes} from '../routes'
import {PrivateRoute} from './private-route'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({path, Component, isPrivate, isExact}) => {
          return (
            <Route
              key={path}
              path={path}
              index={isExact}
              element={
                isPrivate ? (
                  <PrivateRoute>
                    <Component />
                  </PrivateRoute>
                ) : (
                  <Component />
                )
              }
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}
