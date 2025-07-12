import { use, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthProvider"
import axios from "axios"
import useAxiosSecure from "./useAxiosSecure"

const useRole = () =>{
    const {user} = use(AuthContext)
    const [role, setrole] = useState(null)
    const [roleLoading, setRoleLoading] = useState(true)
    const axiosSecure = useAxiosSecure(); 
    
    useEffect(() =>{
        const fetchUserRole = async() =>{
            if(!user) return setRoleLoading(false)
                try{
                    const {data} = await axiosSecure.get (`/user/role/${user?.email}`)
                    setrole(data?.role)
                    
            
                }catch (err){
                    console.log(err)
                }finally{
                    setRoleLoading(false)
                }
           
        }
        
        fetchUserRole()
    },[user,axiosSecure])

    return [role,roleLoading]
}

export default useRole