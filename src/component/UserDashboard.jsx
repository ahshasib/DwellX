import { Link } from "react-router";
import { FaHeart, FaShoppingBag, FaCommentDots, FaStore } from "react-icons/fa";
const UserDashboard = () => {
    return (
        <>
        <li>
          <Link
            to="/dashboard/user/wishlist"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
          >
            <FaHeart className="text-indigo-500" />
            Wishlist
          </Link>
        </li>
      
        <li>
          <Link
            to="/dashboard/user/bought"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
          >
            <FaShoppingBag className="text-indigo-500" />
            Property Bought
          </Link>
        </li>
      
        <li>
          <Link
            to="/dashboard/user/reviews"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
          >
            <FaCommentDots className="text-indigo-500" />
            My Reviews
          </Link>
        </li>
      
        <li>
          <Link
            to="/dashboard/user/become-seller"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
          >
            <FaStore className="text-indigo-500" />
            Be A Seller
          </Link>
        </li>
      </>
    );
  };
  
  export default UserDashboard;
  