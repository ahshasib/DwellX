
import React, { use, useState } from 'react'
import { motion } from 'framer-motion';

// import { AuthContext } from './../context/Authcontext/AuthProvider';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../context/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { imageUpload } from '../api/utils';
import { useNavigate } from 'react-router';

const Register = () => {
 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { createuser,setuser} = use(AuthContext)
  const [passError,setPassError] = useState("");

  const Submitform = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ loading শুরু
    
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const imageFile = form.image.files[0];
  
    try {
      const imageUrl = await imageUpload(imageFile);
  
      if (password.length < 6) {
        toast.error("Password length must be at least 6 characters");
        setLoading(false);
        return;
      }
      if (!/[A-Z]/.test(password)) {
        toast.error("Password must include at least one capital letter");
        setLoading(false);
        return;
      }
      if (!/[a-z]/.test(password)) {
        toast.error("Password must include at least one small letter");
        setLoading(false);
        return;
      }
  
      const userCredential = await createuser(email, password);
      const user = userCredential.user;
  
      await updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      });
  
      // ✅ optional: setuser manually if needed
      setuser({
        ...user,
        displayName: name,
        photoURL: imageUrl,
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: `Welcome ${user.email}!`,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate("/"); // ✅ success হলে navigate করো
      });
  
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false); // ✅ শেষ হলে loading বন্ধ করো
    }
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
          <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
          <input
            type="file"
            name="image"
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
           {loading ? <span class='loading loading-dots loading-xs'></span> : "Register"}
        </button>
      </form>
    </motion.div>

    {/* Right side - Animation */}
   
   
  </div>
    
  )
}

export default Register