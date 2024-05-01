import React from 'react';
// import { TreeView, TreeItem } from '@mui/lab';
// import {MdSpaceDashboard, MdReviews } from 'react-icons/md';
import {MdSpaceDashboard } from 'react-icons/md';
import {BiListPlus, BiListUl, BiBox} from "react-icons/bi";
import {BsPeopleFill} from "react-icons/bs";
import { Link } from 'react-router-dom';
import logo from "../layout/Header/cropped G.png";
import "./topbar.css";

export const TopBar = () => {
  return (
    <div className='topbar'>
      <div>
      <Link to = "/"  className='topbarLogo'>
        <img src={logo} alt="Garden Beans"/>
      </Link>
      </div>
      <div className="topbarOptions">
      <Link to = "/admin/dashboard">
        <p> <MdSpaceDashboard/> Dashboard </p>
      </Link>
     
      <Link to ="/admin/orders">
      <p> <BiBox/> Orders </p>
      </Link>
      <Link to ="/admin/users">
      <p> <BsPeopleFill/> Users </p>
      </Link>
      {/* <Link to ="/admin/reviews">
      <p> <MdReviews/> Reviews </p>
      </Link> */}
      <Link to ="/admin/products">
      <p> <BiListUl/> All Products </p>
      </Link>
      <Link to ="/admin/addproduct">
      <p> <BiListPlus/> Add Product </p>
      </Link>
      {/* <Link>
        <TreeView
          defaultCollapseIcon={<MdOutlineExpandLess/>}
          defaultExpandIcon={<MdOutlineExpandMore/>}
          sx={window.innerWidth > 850 ? { height: 5, flexGrow: 1, maxWidth: 400, overflowY: 'none' }:{}}
        >
          <TreeItem nodeId='1' label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId='2' label="All Products" icon={<BiListUl/>}/>
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId='3' label="Add Product" icon={<BiListPlus/>}/>
            </Link>

          </TreeItem>
        </TreeView>
      </Link> */}
      </div>
    </div>
  )
}

