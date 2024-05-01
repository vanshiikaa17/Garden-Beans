import React, {useEffect} from "react";
import { TopBar } from "./TopBar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { MetaData } from "../layout/MetaData.js";
import { Loading } from "../layout/loading/Loading.js";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getProductsAdmin } from "../../actions/productActions.js";
import {getAllOrders } from "../../actions/orderActions";
import { getAllUsers } from "../../actions/userActions.js";

// import { Doughnut , Line} from 'react-chartjs-2';

export const Dashboard = () => {

  const {loading, products, error }=useSelector(state=>state.product);
  const { error:orderError, orders } = useSelector((state) => state.allOrders);
  const { error:userError, users } = useSelector((state) => state.allUsers);

  const disptach=useDispatch();
  const alert=useAlert();
  useEffect(() => {
    if(error){
      disptach(clearErrors());
      alert.error(error);
    }
    if(orderError){
      disptach(clearErrors());
      alert.error(orderError);
    }
    if(userError){
      disptach(clearErrors());
      alert.error(userError);
    }
    disptach(getProductsAdmin());
    disptach(getAllOrders());
    disptach(getAllUsers());
  }, [alert, error, disptach, orderError, userError])

  let outOfStock=0;

  products&&products.forEach(item => {
    if(item.stock<1)outOfStock++;
  });

  return (
    <>
    <MetaData title="Garden Beans - ADMIN - Dashboard" />

    {loading ? (
      <Loading />
    ) : (
    <div className="dashBoardContainer">
      <div className="dashboardtopbar">
        <TopBar />
      </div>
      <div className="dashboardContent">
        <div className="dashboardheading">
          <h2>STATS</h2>
        </div>
        <div className="dashboardData">
          <Link to="/admin/products">
            <h1>Products</h1>
            <p>{products&&products.length}</p>
          </Link>
          <Link to="/admin/orders" className="orderCount">
            <h1>Orders</h1>
            <p>{orders&&orders.length}</p>
          </Link>
          <Link to="/admin/users">
            <h1>Users</h1>
            <p>{users && users.length}</p>
          </Link>
        </div>
         <div className="dashboardheading">
          <p className="adminStock"> No. of Out Of Stock Products: <span>{outOfStock}</span></p>
          
        </div>
        {/*
        <div className="dashboardheading">
          <h2>Users</h2>
        </div> */}
      </div>
    </div>
    )
}
</>
  );
};
