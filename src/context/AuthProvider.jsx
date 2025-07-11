import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from '../firebase/firebase.init';
import axios from 'axios';

export const AuthContext = createContext();

export const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user , setuser] = useState(null);
    const [loading,setloading] = useState(true)

    const createuser = (email,password) =>{
        setloading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) =>{
        setloading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logout = () =>{
        localStorage.removeItem('token')
        setloading(true)
        return signOut(auth)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentuser)=>{
        setuser(currentuser);


        //post requst jwt user email
          if(currentuser?.email){
            axios.post(`${import.meta.env.VITE_API_URL}/jwt`,{email: currentuser?.email})
            .then(res => {
                localStorage.setItem('token', res.data.token);
              });
          }else{
            localStorage.removeItem('token')
          }


        setloading(false);
        })
        return ()=>{
            unsubscribe();
        }
    })


const authinformation = {
createuser,
loading,
user,
signIn,
logout,
setuser

}

  return (
   <AuthContext value={authinformation}>{children}</AuthContext>
  )
}

export default AuthProvider