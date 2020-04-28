import React, { useEffect } from "react"
import { Route } from "react-router-dom"
import { useAuth0 } from "../react-auth0-spa"

type PrivateRoute = {
  component: any
  path: string
}

const PrivateRoute:React.FC<PrivateRoute> = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (loading || isAuthenticated) {
      return
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: {targetUrl: window.location.pathname}
      })
    }
    fn()
  }, [loading, isAuthenticated, loginWithRedirect])

  const render = (props:any) =>
    isAuthenticated === true ? <Component {...props} /> : null

  return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute