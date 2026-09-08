import React from "react";
import AdminCard from "../components/AdminCard";
import "../styles/adminDashboard.css";
const Dashboard = ()=>{
    return(
        <>
            <div className="admin-dashboard">
                <h1>WELCOME JEFF BOZOS</h1>
                <div className="admin-cards">
                    <AdminCard to="/admin/products" name="Products" num="10" />
                    <AdminCard to="/admin/users" name="Users" num="25" />
                    <AdminCard to="/admin/orders" name="Orders" num="15" />
                </div>
            </div>
        </>
    )
}

export default Dashboard;