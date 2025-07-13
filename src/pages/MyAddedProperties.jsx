import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../component/Loading";
import UpdateModal from "../component/UpdateModal";

const MyAddedProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const fetchProperties = async () => {
    try {
      const res = await axiosSecure.get(`/my-properties?email=${user.email}`);
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [user.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This property will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/my-property/${id}`);
        Swal.fire("Deleted!", "Property deleted successfully.", "success");
        fetchProperties(); // refresh after delete
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        🏠 My Added Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-600">No properties added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="border rounded-xl shadow-lg p-4 bg-white/70"
            >
              <img
                src={property.image}
                alt={property.title}
                className="h-48 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-semibold text-indigo-700">
                {property.title}
              </h3>
              <p className="text-gray-600">Location: {property.location}</p>
              <p className="text-gray-600">
                Price: ৳{property.minPrice} - ৳{property.maxPrice}
              </p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    property.status === "pending"
                      ? "text-yellow-600"
                      : property.status === "verified"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {property.status}
                </span>
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSelectedProperty(property)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded"
                >
                  ✏️ Update
                </button>

                <button
                  onClick={() => handleDelete(property._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedProperty && (
        <UpdateModal
          property={selectedProperty}
          closeModal={() => setSelectedProperty(null)}
          refetch={fetchProperties}
        />
      )}
    </div>
  );
};

export default MyAddedProperties;
