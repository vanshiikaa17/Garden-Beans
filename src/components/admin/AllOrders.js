import React, {useEffect} from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "./TopBar";
import { DataGrid } from "@mui/x-data-grid";
import "./allOrders.css";
// import { clearErrors, deleteProduct, getOrdersAdmin } from "../../actions/productActions";
import {MdEdit} from "react-icons/md";
import {AiTwotoneDelete} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Loading } from "../layout/loading/Loading";
import { MetaData } from "../layout/MetaData";
import { clearErrors,deleteOrder,getAllOrders } from "../../actions/orderActions";
import { DELETE_ORDER_ADMIN_RESET } from "../../constants/orderConstants";

export const AllOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading, error, orders } = useSelector((state) => state.allOrders);
  const {error: deleteError, isDeleted } = useSelector((state) => state.editOrder);

  useEffect(() => {
    if(error){
        dispatch(clearErrors());
        alert.error(error);
    }
    if(deleteError){
        dispatch(clearErrors());
        alert.error(deleteError);
    }
    if(isDeleted){
      dispatch({type:DELETE_ORDER_ADMIN_RESET});
      alert.success("Order Deleted Successfully");
    }
    dispatch(getAllOrders());
  }, [error, alert, dispatch, deleteError, isDeleted]);

  const deleteOrderHandler=(id)=>{
    dispatch(deleteOrder(id));
  }
  
  const columns = [
    {
      field:"id", 
      headerName:"Order ID",
      minWidth:300,
      flex:1,
    
  },
  {
      field:"status", 
      headerName:"Order status",
      minWidth:150,
      flex:0.5,
      cellClassName:(params)=>{
        return params.row.status ==="Processing"?"redBG":"greenBG";
      }
  },
  {
      field:"qty", 
      headerName:"Items",
      type:"number",
      minWidth:100,
      flex:0.5
  },
  {
      field:"amt", 
      headerName:"Order Total",
      type:"number",

      minWidth:100,
      flex:0.5
  },
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 150,
    sortable:false,
    type: "number",
    flex: 0.5,
    renderCell:(params)=>{
        return(
          <>
            <Link to = {`/admin/order/${params.row.id}`}>
               <MdEdit/>
            </Link>
            <Button onClick={()=>deleteOrderHandler(params.row.id)}>
              <AiTwotoneDelete/>
            </Button>
            </>
        )
    }
  }
  ];

  const rows = [];

  
    orders &&
      orders.forEach((item) => {
        rows.push({
          id: item._id,
          status: item.orderStatus,
          qty: item.orderItems.length,
          amt: `₹${item.grandTotal}`,
        });
      });
  
  return (
    <>
    <MetaData title="Garden Beans - ADMIN - All Orders" />

    {loading ? ( 
      <Loading />
    ) : (
      <div className="dashBoardContainer">
        <div className="dashboardtopbar">
          <TopBar />
        </div>
        <div className="adminOrders">
            <h1>All Orders</h1>
            <DataGrid
             rows={rows}
             columns={columns}
             pageSize={10}
             disableSelectionOnClick
             className="OrdersTable"
             autoHeight
             rowHeight={90}
             rowsPerPageOptions={[10,15,20]}
            />
           
        </div>
      </div>
    )
    }
  </>
  );
    
};
