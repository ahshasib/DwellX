import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from '../firebase/firebase.init';

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
        setloading(true)
        return signOut(auth)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentuser)=>{
        setuser(currentuser);
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
logout

}

  return (
   <AuthContext value={authinformation}>{children}</AuthContext>
  )
}

export default AuthProvider