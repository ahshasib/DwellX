import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthProvider";
import AddPropertyForm from "../component/AddPropertyForm";
import axios from "axios";
import { imageUpload } from "../api/utils";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";


const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const [uploading,setUploading] = useState(false)
  const axiosSecure = useAxiosSecure(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true)
    const form = e.target;
  
    const imageFile = form.image.files[0];
  
    // Step 1: Convert image to FormData
    
  
    try {
      // Step 2: Upload to imgbb
     
  
      const imageUrl = await imageUpload(imageFile) // uploaded image URL
  
      // Step 3: Create propertyData object with imageUrl
      const propertyData = {
        title: form.title.value,
        location: form.location.value,
        type: form.type.value,
        beds: form.beds.value,
        baths: form.baths.value,
        status: form.status.value,
        sqft: form.sqft.value,
        price: form.price.value,
        description: form.description.value,
        image: imageUrl,
        agent: {
          name: user.displayName,
          email: user.email,
          image:user.photoURL
        },
      };
  
      // console.log("Submitted Property:", propertyData);
      const {data} = await axiosSecure.post(`/add-properties`,propertyData
      )

      Swal.fire({
        icon: 'success',
        title: 'Property added Successful!',
        text: `Thanks for uploading, ${user.displayName}!`,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      })
  
      form.reset()
      // Step 4: Send propertyData to your database/server
      // await axios.post('YOUR_API_URL/properties', propertyData);
  
    } catch (error) {
      console.error("Image upload failed:", error);
    }
    finally{
        setUploading(false)
    }
  };
  
  


  return (
    <div>
        <AddPropertyForm handleSubmit = {handleSubmit} uploading={uploading}></AddPropertyForm>
    </div>
  );
};

export default AddProperty;
