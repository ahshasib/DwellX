import { Link } from "react-router";

const AgentDashboard = () => {
    return (
        <>
        <Link to="/dashboard/add-property"><li className="py-2"> Add Property</li></Link> 
        <Link><li className="py-2"> My Added Properties</li></Link>
        <Link><li className="py-2"> My Sold Properties</li></Link>
        <Link><li className="py-2"> Requested Properties</li></Link>
        </>
    );
  };
  
  export default AgentDashboard;
  