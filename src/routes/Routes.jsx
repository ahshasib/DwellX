import { createBrowserRouter } from "react-router";
import PrivateRoute from "../context/PrivateRoute";
import Mainlayout from "../layout/Mainlayout";
import AllProperties from "../pages/AllProperties";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PropertyDetails from "../pages/PropertyDetails";
import DashboardLayout from "../pages/DashboardLayout";
import AddProperty from "../pages/AddProperty";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      { path: '/', 
        element: <Home />,
        loader:()=>fetch(`${import.meta.env.VITE_API_URL}/properties`)
       },
      { path: '/allproperties', element: <PrivateRoute><AllProperties /></PrivateRoute> },
      { path: '/property/:id', element: <PrivateRoute><PropertyDetails /></PrivateRoute> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
//       // User routes
//       { path: 'user/profile', element: <UserRoute><UserProfile /></UserRoute> },
//       { path: 'user/wishlist', element: <UserRoute><Wishlist /></UserRoute> },
//       { path: 'user/bought', element: <UserRoute><BoughtProperties /></UserRoute> },
//       { path: 'user/reviews', element: <UserRoute><MyReviews /></UserRoute> },
//       { path: 'user/make-offer/:id', element: <UserRoute><MakeOffer /></UserRoute> },
//       { path: 'user/payment/:id', element: <UserRoute><PaymentPage /></UserRoute> },

//       // Agent routes
//       { path: 'agent/profile', element: <AgentRoute><AgentProfile /></AgentRoute> },
         { path: 'add-property', element: <AddProperty />},
//       { path: 'agent/my-properties', element: <AgentRoute><MyProperties /></AgentRoute> },
//       { path: 'agent/update/:id', element: <AgentRoute><UpdateProperty /></AgentRoute> },
//       { path: 'agent/my-sold', element: <AgentRoute><MySold /></AgentRoute> },
//       { path: 'agent/requests', element: <AgentRoute><RequestedProperties /></AgentRoute> },
//       { path: 'agent/stats', element: <AgentRoute><AgentStats /></AgentRoute> },

//       // Admin routes
//       { path: 'admin/profile', element: <AdminRoute><AdminProfile /></AdminRoute> },
//       { path: 'admin/manage-properties', element: <AdminRoute><ManageProperties /></AdminRoute> },
//       { path: 'admin/manage-users', element: <AdminRoute><ManageUsers /></AdminRoute> },
//       { path: 'admin/manage-reviews', element: <AdminRoute><ManageReviews /></AdminRoute> },
//       { path: 'admin/advertise', element: <AdminRoute><AdvertiseProperty /></AdminRoute> },
//       { path: 'admin/reports', element: <AdminRoute><ReportedProperties /></AdminRoute> },
    ],
  },
//   {
//     path: '*',
//     element: <NotFound />,
//   },
]);

export default router;
