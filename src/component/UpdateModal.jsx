import { useState } from "react";
import { imageUpload } from "../api/utils";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UpdateModal = ({ property, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(property.title);
  const [minPrice, setMinPrice] = useState(property.minPrice);
  const [maxPrice, setMaxPrice] = useState(property.maxPrice);
  const [image, setImage] = useState(null);

  const { mutate: updateProperty, isLoading } = useMutation({
    mutationFn: async () => {
      let updatedImage = property.image;

      if (image) {
        updatedImage = await imageUpload(image);
      }

      const updatedData = {
        title,
        minPrice: parseInt(minPrice),
        maxPrice: parseInt(maxPrice),
        image: updatedImage,
      };

      const res = await axiosSecure.put(`/my-property/${property._id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        return true;
      } else {
        throw new Error("No modification made");
      }
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Property updated successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["my-properties"] });
      closeModal();
    },
    onError: (error) => {
      console.error(error);
      Swal.fire("Error", "Update failed", "error");
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProperty();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-red-500 text-xl">✕</button>

        <h2 className="text-xl font-semibold mb-4 text-indigo-600">Update Property</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Property Title"
            className="input input-bordered w-full"
          />

          <div className="flex gap-4">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min Price"
              min={0}
              className="input input-bordered w-full"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max Price"
              min={minPrice}
              className="input input-bordered w-full"
            />
          </div>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />

          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
