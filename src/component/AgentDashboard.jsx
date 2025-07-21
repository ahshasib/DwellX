import { Link } from "react-router";
import { FaPlusCircle, FaListAlt, FaDollarSign, FaClipboardList } from "react-icons/fa";

const AgentDashboard = () => {
    return (
        <>
        <li>
          <Link
            to="/dashboard/agent/add-property"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
          >
            <FaPlusCircle className="text-indigo-500" />
            Add Property
          </Link>
        </li>
      
        <li>
          <Link
            to="/dashboard/agent/my-properties"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
          >
            <FaListAlt className="text-indigo-500" />
            My Added Properties
          </Link>
        </li>
      
        <li>
          <Link
            to="/dashboard/agent/my-sold"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
          >
            <FaDollarSign className="text-indigo-500" />
            My Sold Properties
          </Link>
        </li>
      
        <li>
          <Link
            to="/dashboard/agent/requests"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
          >
            <FaClipboardList className="text-indigo-500" />
            Requested Properties
          </Link>
        </li>
      </>
    );
  };
  
  export default AgentDashboard;
  