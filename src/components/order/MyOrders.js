import React, { useEffect } from "react";
import { MetaData } from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../layout/loading/Loading";
import { DataGrid } from "@mui/x-data-grid";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../actions/orderActions";
import {MdReadMore} from "react-icons/md";
import { Link } from "react-router-dom";
import "./myorders.css";

export const MyOrders = () => {
  const { loading, orders, error } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const alert = useAlert();
  const dispatch = useDispatch();

  const columns = [
    {
        field:"id", 
        headerName:"Order ID",
        minWidth:300,
        flex:1,
        renderCell:(params)=>{
            return(
                <Link to = {`/order/${params.row.id}`}>
                    <MdReadMore/> {params.row.id}
                </Link>
            )
        }
    },
    {
        field:"status", 
        headerName:"Order status",
        minWidth:150,
        flex:0.5
    },
    {
        field:"qty", 
        headerName:"Quantity",
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
    // {
    //     field:"action", 
    //     headerName:"Order History",
    //     type:"number",
    //     sortable:false,
    //     minWidth:100,
    //     flex:0.5,
    //     renderCell:(params)=>{
    //         return(
    //             <Link to = {`/order/${params.getValue(params.id, "id")}`}>
    //                 <MdReadMore/>
    //             </Link>
    //         )
    //     }
    // },
  ];
  
  const rows = [];
    orders && 
    orders.forEach((item, idx) => {
        rows.push({
            id:item._id,
            status:item.orderStatus,
            qty:item.orderItems.length,
            amt:`₹${item.grandTotal}`
        });
    });
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());

  }, [alert, dispatch, error]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loading />
      ) : (
        <div className="myOrdersContainer">
         <h2>Your Orders</h2>   
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="ordersTable"
            autoHeight
            rowHeight={90}
            rowsPerPageOptions={[10,20,30]}

          />
        </div>
      )}
    </>
  );
};
