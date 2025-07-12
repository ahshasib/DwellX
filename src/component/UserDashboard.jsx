import { Link } from "react-router";

const UserDashboard = () => {
    return (
        <>
        <Link to="user/wishlist"><li className="py-2"> Wishlist</li></Link> 
        <Link to="user/bought"><li className="py-2"> Property Bought</li></Link>
        <Link><li className="py-2"> My Reviews</li></Link>
        <Link to="user/become-seller"><li className="py-2"> Be A Seller</li></Link>
        
        </>
    );
  };
  
  export default UserDashboard;
  