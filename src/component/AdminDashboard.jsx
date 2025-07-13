import { Link } from "react-router";

const AdminDashboard = () => {
    return (
     <>
     <Link to='/dashboard/admin/manage-properties'><li className="py-2"> Manage Properties</li></Link>
     <Link to='/dashboard/admin/manage-users'><li className="py-2"> Manage Users</li></Link>
     <Link to="admin/manage-reviews"><li className="py-2"> Manage Reviews</li></Link>
     </>
    );
  };
  
  export default AdminDashboard;
  