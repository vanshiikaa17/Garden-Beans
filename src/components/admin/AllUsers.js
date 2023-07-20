import React, {useEffect} from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { TopBar } from "./TopBar";
import { DataGrid } from "@mui/x-data-grid";
import "./allUsers.css";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userActions";
import {MdEdit} from "react-icons/md";
import {AiTwotoneDelete} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Loading } from "../layout/loading/Loading";
import { MetaData } from "../layout/MetaData";
import { DELETE_USER_RESET } from "../../constants/userConstants";

export const AllUsers = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading, error, users, isDeleted } = useSelector((state) => state.allUsers);
  // const {error: deleteError, isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    if(error){
        dispatch(clearErrors());
        alert.error(error);
    }
    if(isDeleted){
      alert.success("User Removed Successfully.");
      dispatch({type:DELETE_USER_RESET});
    }
    dispatch(getAllUsers());
  }, [error, alert, dispatch,isDeleted]);

  const deleteUserHandler=(id)=>{
    dispatch(deleteUser(id));
  }
  
  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 300,
      flex: 1,
      
    },
    {
      field: "name",
      headerName: "User name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "E-mail",
      minWidth: 200,
      type: "number",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 200,
      type: "number",
      flex: 0.5,
      cellClassName:(params)=>{
        // return params.row.id === "user"?"greenBG":"redBG";
        return params.row.role=== "admin" && "greenBG" ;
      }
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
              <Link to = {`/admin/userdetails/${params.row.id}`}>
                 <MdEdit/>
              </Link>
              <Button disabled={params.row.role==="admin"&&true} onClick={()=>deleteUserHandler(params.row.id)}>
                <AiTwotoneDelete/>
              </Button>
              </>
          )
      }
    },
  ];

  const rows = [];

  
    users &&
      users.forEach((item) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
        });
      });
  
  return (
    <>
    <MetaData title="Garden Beans - ADMIN - All Users" />

    {loading ? ( 
      <Loading />
    ) : (
      <div className="dashBoardContainer">
        <div className="dashboardtopbar">
          <TopBar />
        </div>
        <div className="adminUsers">
            <h1>All Users</h1>
            <DataGrid
             rows={rows}
             columns={columns}
             pageSize={10}
             disableSelectionOnClick
             className="usersTable"
             autoHeight
             rowHeight={90}
             rowsPerPageOptions={[10,20,30]}
            />
           
        </div>
      </div>
    )
    }
  </>
  );
    
};
