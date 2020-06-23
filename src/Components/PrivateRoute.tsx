import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { UserStateType } from "../redux/reducers/users/usersReducer"

type PrivateRoute = {
  user: UserStateType
  component: any
  path: string
}

const PrivateRoute:React.FC<PrivateRoute> = ({ component: Component, user, path, ...rest }) => {
  // const [isAuthenticated, setAuthenticated] = useState(false)

  // useEffect(() => {
  //   setAuthenticated(user?.username ? true : false)
  // }, [user])

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     return
  //   }
  //   const fn = async () => {
  //     return <Redirect to='/login' />
  //   }
  //   fn()
  // }, [isAuthenticated])

  const render = (props:any) =>
    <Component {...props} />

  if (user && user.username) {
    return <Route path={path} render={render} {...rest} />
  } else {
    return <Redirect to='/login' />
  }

}

const mapStateToProps = (state: any) => ({
  user: state.userReducer
})

export default connect(mapStateToProps)(PrivateRoute)