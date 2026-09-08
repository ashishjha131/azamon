import React from "react";
import {Link} from "react-router-dom";
import "../styles/adminDashboard.css";
const AdminCard=(props)=>{
    return(
        <>  
            <Link to={props.to} className="admin-card">
                <h3>{props.name}</h3>
                <h6>{props.num}</h6>
            </Link>
        </>
    )
}
export default AdminCard;