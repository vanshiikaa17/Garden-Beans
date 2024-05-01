import React, {useEffect} from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "./TopBar";
import { DataGrid } from "@mui/x-data-grid";
import "./allProducts.css";
import { clearErrors, deleteProduct, getProductsAdmin } from "../../actions/productActions";
import {MdEdit} from "react-icons/md";
import {AiTwotoneDelete} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Loading } from "../layout/loading/Loading";
import { MetaData } from "../layout/MetaData";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

export const AllProducts = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading, error, products } = useSelector((state) => state.product);
  const {error: deleteError, success, message } = useSelector((state) => state.deleteProduct);

  useEffect(() => {
    if(error){
        dispatch(clearErrors());
        alert.error(error);
    }
    if(deleteError){
        dispatch(clearErrors());
        alert.error(deleteError);
    }
    if(success){
      dispatch({type:DELETE_PRODUCT_RESET});
      alert.success(message);
    }
    dispatch(getProductsAdmin());
  }, [error, alert, dispatch, deleteError,success]);

  const deleteProductHandler=(id)=>{
    dispatch(deleteProduct(id));
  }
  
  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 300,
      flex: 1,
      
    },
    {
      field: "name",
      headerName: "Product name",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 200,
      type: "number",
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 250,
      type: "number",
      flex: 0.5,
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
              <Link to = {`/admin/product/${params.row.id}`}>
                 <MdEdit/>
              </Link>
              <Button onClick={()=>deleteProductHandler(params.row.id)}>
                <AiTwotoneDelete/>
              </Button>
              </>
          )
      }
    },
  ];

  const rows = [];

  
    products &&
      products.forEach((item) => {
        rows.push({
          id: item._id,
          name: item.name,
          stock: item.stock,
          price: `₹${item.price}`,
        });
      });
  
  return (
    <>
    <MetaData title="Garden Beans - ADMIN - All Products" />

    {loading ? ( 
      <Loading />
    ) : (
      <div className="dashBoardContainer">
        <div className="dashboardtopbar">
          <TopBar />
        </div>
        <div className="adminProducts">
            <h1>All Products</h1>
            <DataGrid
             rows={rows}
             columns={columns}
             pageSize={10}
             disableSelectionOnClick
             className="productsTable"
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
