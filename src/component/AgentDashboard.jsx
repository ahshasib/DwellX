import { Link } from "react-router";

const AgentDashboard = () => {
    return (
        <>
        <Link to="/dashboard/agent/add-property"><li className="py-2"> Add Property</li></Link> 
        <Link to="/dashboard/agent/my-properties"><li className="py-2"> My Added Properties</li></Link>
        <Link to="/dashboard/agent/my-sold"><li className="py-2"> My Sold Properties</li></Link>
        <Link to="/dashboard/agent/requests"><li className="py-2"> Requested Properties</li></Link>
        </>
    );
  };
  
  export default AgentDashboard;
  