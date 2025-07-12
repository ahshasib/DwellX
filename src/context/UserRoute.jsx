import React from 'react'

import { Navigate} from 'react-router'
import Loading from '../component/Loading'
import useRole from '../hooks/useRole'

const UserRoute =({children}) => {
    const [role, roleLoading] = useRole()
  
    if(roleLoading) {
      return <Loading></Loading>
    }
  
    if(role === 'customer'){
      return children
  }
  
  return <Navigate  to="/"></Navigate>
  
  }

export default UserRoute