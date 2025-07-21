import { Link } from "react-router";
import { FaHome, FaUsers, FaStar } from "react-icons/fa";
const AdminDashboard = () => {
    return (
      <>
      <li>
        <Link
          to="/dashboard/admin/manage-properties"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
        >
          <FaHome className="text-indigo-500" />
          Manage Properties
        </Link>
      </li>
    
      <li>
        <Link
          to="/dashboard/admin/manage-users"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
        >
          <FaUsers className="text-indigo-500" />
          Manage Users
        </Link>
      </li>
    
      <li>
        <Link
          to="/dashboard/admin/manage-reviews"
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
        >
          <FaStar className="text-indigo-500" />
          Manage Reviews
        </Link>
      </li>
    </>
    );
  };
  
  export default AdminDashboard;
  