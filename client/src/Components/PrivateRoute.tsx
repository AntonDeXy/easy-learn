import React, { useCallback, useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { getNewToken, UserStateType } from "../redux/reducers/users/usersReducer"
import { ListsWrapper } from "./lists/styles/styled-lists"
import Spiner from "./Spiner"
import { useStateIfMounted } from "use-state-if-mounted"

type PrivateRoutePropsType = {
  user: UserStateType
  component: any
  path: string
  getNewToken: (refreshToken: string, success: (res: getNewTokenCBResponseType) => void) => void
}

type getNewTokenCBResponseType = {
  success: boolean 
} 

const PrivateRoute: React.FC<PrivateRoutePropsType> = ({ component: Component, user, path, getNewToken, ...rest }) => {
  const [isAuthenticated, setAuthenticated] = useStateIfMounted(false)
  const [isTokenChecked, setTokenChecked] = useStateIfMounted(false)
  const [isLoading, setLoading] = useStateIfMounted(false)

  const CheckRefreshToken = useCallback((refreshToken: string) => {
    getNewToken(refreshToken, (res: getNewTokenCBResponseType) => {
      if (res.success) {
        setAuthenticated(true)
      }
      setTokenChecked(true)
      setLoading(false)
    })
  }, [getNewToken, setAuthenticated, setLoading, setTokenChecked])

  useEffect(() => {
    if (!isLoading && !isTokenChecked) {
      const refreshToken = localStorage.getItem('refresh-token')
      if (refreshToken) {
        CheckRefreshToken(refreshToken)
      } else {
        setTokenChecked(false)
      }
      setLoading(true)
    }
  }, [CheckRefreshToken, getNewToken, isLoading, isTokenChecked, setAuthenticated, setLoading, setTokenChecked])

  const render = (props: any) =>
    <Component {...props} />

  if (isTokenChecked && isAuthenticated && !isLoading) {
    return <Route path={path} render={render} {...rest} />
  } else if (isTokenChecked && !isAuthenticated && !isLoading) {
    return <Redirect to='/login' />
  }

  return (
    <ListsWrapper>
      <Spiner />
    </ListsWrapper>
  ) 

}

const mapDispatchToProps = ({
  getNewToken: (refreshToken: string, success: (res: getNewTokenCBResponseType) => void) => getNewToken(refreshToken, success)
})

const mapStateToProps = (state: any) => ({
  user: state.userReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)