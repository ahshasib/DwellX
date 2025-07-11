import { use, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { FaBars, FaUserCircle } from "react-icons/fa";
import AdminDashboard from "../component/AdminDashboard";
import UserDashboard from "../component/UserDashboard";
import AgentDashboard from "../component/AgentDashboard";
import { AuthContext } from "../context/AuthProvider";
import useRole from "../hooks/useRole";
import Loading from "../component/Loading";

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [role,roleLoading] = useRole()
    
    const{user} = use(AuthContext)

    const toggleSidebar = () => setIsOpen(!isOpen);

    if(roleLoading) return <Loading></Loading>

    return (
        <div className="min-h-screen flex flex-col md:flex-row relative">

            {/* Mobile Button */}
            <button
                className="md:hidden absolute top-4 right-4 z-50 bg-indigo-600 text-white p-2 rounded-full shadow-lg"
                onClick={toggleSidebar}
            >
                <FaBars size={20} />
            </button>
            <NavLink to="/" className="flex items-center md:hidden absolute top-4 left-4 gap-2">
                    <img src="./logo1.png" alt="Logo" className="w-10 rounded-md" />
                    <div className="leading-tight">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
                            DuellX
                        </h1>
                        <span className="text-[11px] text-gray-500 block -mt-1">we are best</span>
                    </div>
                </NavLink>


            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-full md:h-screen bg-indigo-100 w-64 md:w-[20%] p-4 z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >

                <div className="flex justify-center bg-white py-3 rounded-lg">
                <NavLink to="/" className="flex items-center gap-2">
                    <img src="./logo1.png" alt="Logo" className="w-10 rounded-md" />
                    <div className="leading-tight">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
                            DuellX
                        </h1>
                        <span className="text-[11px] text-gray-500 block -mt-1">we are best</span>
                    </div>
                </NavLink>
                </div>



                {/* User Profile */}
                <div className="text-center mb-6 mt-5">
                    <img src={user?.photoURL} className="w-12 rounded-full mx-auto mb-2" />
                    <h2 className="text-lg font-semibold text-gray-800">{user?.displayName}</h2>
                    <NavLink to="/dashboard/user/profile" className="mt-2 text-sm text-white bg-indigo-600 px-4 py-1 rounded-full hover:bg-indigo-700 transition">
                        View Profile
                    </NavLink>
                </div>

                {/* Menu List */}
                <ul className="space-y-3">
                    {role === 'customer' && <UserDashboard />}
                    {role === 'seller' && <AgentDashboard />}
                    {role === 'admin' && <AdminDashboard />}
                    
                    
                    
                </ul>
            </aside>

            {/* Outlet */}
            <main className="flex-1 bg-gradient-to-br from-purple-100 via-white to-blue-100 p-6 md:ml-0 ml-0 mt-16 md:mt-0">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
