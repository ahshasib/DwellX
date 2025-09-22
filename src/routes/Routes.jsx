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
import Wishlist from "../pages/Wishlist";
import MakeOffer from "../pages/MakeOffer";
import BoughtProperties from "../pages/BoughtProperties";
import Profile from "../pages/Profile";
import AdminRoute from "../context/AdminRoute";
import ManageUsers from "../pages/ManageUsers";
import ManageProperties from "../pages/ManageProperties";
import AgentRoute from "../context/AgentRoute";
import UserRoute from "../context/UserRoute";
import BecomeSeller from "../pages/BecomeSeller";
import MyAddedProperties from "../pages/MyAddedProperties";
import RequestedProperties from "../pages/RequestedProperties";
import MyReviews from "../pages/MyReviews";
import AdminManageReviews from "../pages/AdminManageReviews";
import MySoldProperties from "../pages/MySoldProperties";
import DashboardLanding from "../pages/DashboardLanding";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Consultant from "../pages/Consultant";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      { path: '/', 
        element: <Home />,
        
       },
      { path: '/allproperties', element: <AllProperties /> },
      { path: '/contact', element: <Contact /> },
      { path: '/consultant', element: <Consultant /> },
      { path: '/property/:id', element:<PrivateRoute> <UserRoute><PropertyDetails /></UserRoute></PrivateRoute> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {path:'/aboutUs', element: <AboutUs></AboutUs>}
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [


      {
        path: '',
        element: <PrivateRoute><DashboardLanding /></PrivateRoute>, 
      },
//       // User routes
         { path: 'profile', element: <Profile />},
         { path: 'user/wishlist', element: <UserRoute><Wishlist /></UserRoute> },
         { path: 'user/make-offer/:id', element: <UserRoute><MakeOffer /></UserRoute> },
         
         { path: 'user/bought', element:<UserRoute><BoughtProperties /></UserRoute> },
        { path: 'user/reviews', element: <UserRoute><MyReviews /></UserRoute> },
          { path: 'user/become-seller', element: <UserRoute><BecomeSeller/></UserRoute> },
//       
//        { path: 'user/payment/:id', element: <UserRoute><PaymentPage /></UserRoute> },

//       // Agent routes
//       { path: 'agent/profile', element: <AgentRoute><AgentProfile /></AgentRoute> },
         { path: 'agent/add-property', element:<AgentRoute><AddProperty /></AgentRoute>},
        { path: 'agent/my-properties', element: <AgentRoute><MyAddedProperties /></AgentRoute> },
//       { path: 'agent/update/:id', element: <AgentRoute><UpdateProperty /></AgentRoute> },
      { path: 'agent/my-sold', element: <AgentRoute><MySoldProperties /></AgentRoute> },
      { path: 'agent/requests', element: <AgentRoute><RequestedProperties /></AgentRoute> },
//       { path: 'agent/stats', element: <AgentRoute><AgentStats /></AgentRoute> },

//       // Admin routes
//       { path: 'admin/profile', element: <AdminRoute><AdminProfile /></AdminRoute> },
        { path: 'admin/manage-properties', element: <AdminRoute><ManageProperties /></AdminRoute> },
        { path: 'admin/manage-users', element: <AdminRoute><ManageUsers /></AdminRoute> },
        { path: 'admin/manage-reviews', element: <AdminRoute><AdminManageReviews/></AdminRoute> },
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
