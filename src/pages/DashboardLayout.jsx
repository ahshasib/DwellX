// আগের মতোই import গুলো থাকবে
import { use, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { FaBars, FaUserCircle } from "react-icons/fa";
import AdminDashboard from "../component/AdminDashboard";
import UserDashboard from "../component/UserDashboard";
import AgentDashboard from "../component/AgentDashboard";
import { AuthContext } from "../context/AuthProvider";
import useRole from "../hooks/useRole";
import Loading from "../component/Loading";
import RotatingSparkleButton from "../component/RotatingSparkleButton";
import { FaUser, FaHome } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [role, roleLoading] = useRole();
    const { user } = use(AuthContext);

    const toggleSidebar = () => setIsOpen(!isOpen);

    if (roleLoading) return <Loading />;

    return (
        <div className="min-h-screen flex flex-col md:flex-row relative">
            <Helmet>
                <title>Dashboard | DwellX</title>
            </Helmet>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden fixed top-4 right-4 z-50 bg-indigo-700 text-white p-3 rounded-full shadow-lg"
                onClick={toggleSidebar}
            >
                <FaBars size={22} />
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-full md:h-screen bg-white/80 backdrop-blur-lg shadow-lg w-72 p-4 z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                <div className="relative h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-5 py-2">
                        <Link to="/" className="flex items-center gap-2 group relative overflow-hidden">
                            <div className="relative">
                                <img
                                    src="./logo1.png"
                                    alt="Logo"
                                    className="w-10 rounded-xl transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute -top-1 -left-1">
                                    <RotatingSparkleButton size={16} />
                                </div>
                            </div>
                            <div className="leading-tight hidden sm:block">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500">
                                    DwellX
                                </h1>
                                <span className="text-[11px] text-gray-500 block -mt-1">we are best</span>
                            </div>
                        </Link>
                    </div>

                    {/* User Profile */}
                    <div className="flex flex-col items-center text-center mb-6 bg-indigo-50 rounded-xl p-4 shadow-md">
                        <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-indigo-500 mb-2">
                            <img src={user?.photoURL} alt="user" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">{user?.displayName}</h2>
                        <p className="text-xs text-gray-500 mb-2">{user?.email}</p>
                        <NavLink
                            to="/dashboard/profile"
                            className="inline-block mt-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full hover:scale-105 transition"
                        >
                            View Profile
                        </NavLink>
                    </div>

                    {/* Dashboard Menu */}
                    <ul className="space-y-4 px-2">
                        {role === 'customer' && <UserDashboard />}
                        {role === 'seller' && <AgentDashboard />}
                        {role === 'admin' && <AdminDashboard />}
                    </ul>

                    <ul className=" w-full py-5 absolute bottom-0 border-t-2 border-gray-300">
                        <li>
                            <Link
                                to="/dashboard/profile"
                                className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
                            >
                                <FaUser className="text-indigo-500" />
                                Profile
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/"
                                className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
                            >
                                <FaHome className="text-indigo-500" />
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 md:ml-0 ml-0 mt-20 md:mt-0 transition-all duration-500">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
