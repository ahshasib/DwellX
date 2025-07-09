import React, { use, useState} from 'react'
import { motion } from 'framer-motion';

// import { auth, AuthContext } from './../context/Authcontext/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { auth, AuthContext } from '../context/AuthProvider';




const Login = () => {
  const {signIn} = use(AuthContext)
  const [error,setError] = useState("")
  const googleProvider = new GoogleAuthProvider();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6){
      toast.error("Password length must be min 6 character");
      return
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include at least one capital letter");
      return;
    }
    
    // Check small letter
    if (!/[a-z]/.test(password)) {
      toast.error("Password must include at least one small letter");
      return;
    }
    
    else{
      setError("")
    }
  
    signIn(email,password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${user.email}!`,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate(location.state ? location.state : "/");
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `invalid-credential`,
        footer: 'Put the correct password'
      });
    });
    
  };



  const handleGoogleLogin = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const user = result.user;


      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${user.email}!`,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate(location.state ? location.state : "/");
      });

    })
    .catch(error =>{
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    }
  



  return (
    <div className=" min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col-reverse lg:flex-row justify-center items-center p-4">
       <Helmet>
    <title>Login| MarathonMate</title>
  </Helmet>
     <ToastContainer></ToastContainer>
       {/* Left side - Form */}
       <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br to-purple-100 from-blue-100 px-8 py-16 rounded-2xl shadow-2xl w-full max-w-lg lg:mr-12"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500">or</div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleGoogleLogin}
          className="mt-4 w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition duration-300"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </motion.button>
        <p className='font-bold pt-4 text-base text-black text-center'><Link to="/register">Don't have any account? <span className='text-red-500 underline'>Register</span></Link></p>
      </motion.div>

      {/* Right side - Animation */}
      
    </div>
  )
}

export default Login