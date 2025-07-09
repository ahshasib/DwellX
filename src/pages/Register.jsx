
import React, { use, useState } from 'react'
import { motion } from 'framer-motion';

// import { AuthContext } from './../context/Authcontext/AuthProvider';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../context/AuthProvider';

const Register = () => {
 

  const { createuser} = use(AuthContext)
  const [passError,setPassError] = useState("");

  const Submitform = (e) => {
    e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;


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
    setPassError("")
  }


  createuser(email,password)
  .then((userCredential) => {
    const user = userCredential.user;

    Swal.fire({
      icon: 'success',
      title: 'Logout Successful!',
      text: `Welcom ${user.email}!`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    })

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };


  return (
    
    <div className=" min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col-reverse lg:flex-row justify-center items-center p-4 ">
       <Helmet>
    <title>Register| MarathonMate</title>
  </Helmet>
      <ToastContainer />
     {/* Left side - Form */}
     <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br to-purple-100 from-blue-100 px-8 py-16 rounded-2xl shadow-2xl w-full max-w-lg lg:mr-12"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register Now</h2>

      <form onSubmit={Submitform} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Photo Url</label>
          <input
            type="text"
            name="photoUrl"
            required
            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="your photo url"
          />
        </div>

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
        {passError && <p className='text-red-400'>{passError}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Log In
        </button>
      </form>
    </motion.div>

    {/* Right side - Animation */}
   
   
  </div>
    
  )
}

export default Register