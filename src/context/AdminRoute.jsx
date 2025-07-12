import React from 'react'

import { Navigate} from 'react-router'
import Loading from '../component/Loading'
import useRole from '../hooks/useRole'

const AdminRoute =({children}) => {
    const [role, roleLoading] = useRole()
  
    if(roleLoading) {
      return <Loading></Loading>
    }
  
    if(role === 'admin'){
      return children
  }
  
  return <Navigate  to="/"></Navigate>
  
  }

export default AdminRoute