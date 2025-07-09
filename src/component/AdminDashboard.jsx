import { Link } from "react-router";

const AdminDashboard = () => {
    return (
     <>
     <Link><li className="py-2"> Manage Properties</li></Link>
     <Link><li className="py-2"> Manage Users</li></Link>
     <Link><li className="py-2"> Manage Reviews</li></Link>
     </>
    );
  };
  
  export default AdminDashboard;
  