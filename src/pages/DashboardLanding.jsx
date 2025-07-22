import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useRole from "../hooks/useRole";
import SellerSummary from "./SellerSummary";
import BuyerSummaryPage from "./BuyerSummaryPage";

const DashboardLanding = () => {
  const [role, roleLoading] = useRole();
  const { user } = useContext(AuthContext);

  // 🔄 Loading State for Role
  if (roleLoading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const adminLinks = [
    { to: "/dashboard/admin/manage-properties", label: "Manage Properties" },
    { to: "/dashboard/admin/manage-users", label: "Manage Users" },
    { to: "/dashboard/admin/manage-reviews", label: "Manage Reviews" },
  ];

  const agentLinks = [
    { to: "/dashboard/agent/add-property", label: "Add Property" },
    { to: "/dashboard/agent/my-properties", label: "My Added Properties" },
    { to: "/dashboard/agent/my-sold", label: "My Sold Properties" },
    { to: "/dashboard/agent/requests", label: "Requested Properties" },
  ];

  const userLinks = [
    { to: "/dashboard/profile", label: "Profile" },
    { to: "/dashboard/user/wishlist", label: "Wishlist" },
    { to: "/dashboard/user/bought", label: "Bought Properties" },
    { to: "/dashboard/user/reviews", label: "My Reviews" },
    { to: "/dashboard/user/become-seller", label: "Be A Seller" },
  ];

  let links = [];
  let showSellerSummary = false;
  let showBuyerSummary = false;

  if (role === "admin") {
    links = adminLinks;
  } else if (role === "seller") {
    links = agentLinks;
    showSellerSummary = true;
  } else {
    links = userLinks;
    showBuyerSummary = true;
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <motion.h2
        className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500 text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to your Dashboard, {user?.displayName?.split(" ")[0]}!
      </motion.h2>

      {showSellerSummary && (
        <div className="w-full mb-12">
          <SellerSummary userEmail={user?.email} />
        </div>
      )}

        {
          showBuyerSummary && (
            <div className="w-full mb-12">
          <BuyerSummaryPage userEmail={user?.email} />
        </div>
          )
        }


      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {links.map((link) => (
          <motion.div
            key={link.to}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to={link.to}
              className="block text-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl shadow-lg hover:shadow-xl font-semibold"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DashboardLanding;
