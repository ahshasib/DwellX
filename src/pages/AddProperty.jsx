import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import AddPropertyForm from "../component/AddPropertyForm";
import { imageUpload } from "../api/utils";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Step 1: Create mutation for posting property
  const addPropertyMutation = useMutation({
    mutationFn: async (propertyData) => {
      const { data } = await axiosSecure.post(`/add-properties`, propertyData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Property added Successful!",
        text: `Thanks for uploading, ${user.displayName}!`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    },
    onError: (error) => {
      console.error("Failed to add property:", error);
      Swal.fire({
        icon: "error",
        title: "Upload failed!",
        text: "Something went wrong. Please try again.",
      });
    },
    onSettled: () => {
      setUploading(false);
    },
  });

  // Step 2: Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const form = e.target;
    const imageFile = form.image.files[0];

    try {
      const imageUrl = await imageUpload(imageFile); // uploaded image URL

      const propertyData = {
        title: form.title.value,
        location: form.location.value,
        type: form.type.value,
        beds: form.beds.value,
        baths: form.baths.value,
        status: form.status.value,
        sqft: form.sqft.value,
        minPrice: parseInt(form.minPrice.value),
        maxPrice: parseInt(form.maxPrice.value),
        description: form.description.value,
        image: imageUrl,
        agent: {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        },
      };

      // Step 3: Call mutation
      addPropertyMutation.mutate(propertyData);
      form.reset();

    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  return (
    <div>
      <AddPropertyForm handleSubmit={handleSubmit} uploading={uploading} />
    </div>
  );
};

export default AddProperty;
