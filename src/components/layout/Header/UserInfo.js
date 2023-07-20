import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Backdrop from '@mui/material/Backdrop';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import "./Header.css"
export const UserInfo = ({user}) => {
  const alert=useAlert();
  const dispatch=useDispatch();
  const [open, setOpen] = useState(false)
  const nav =useNavigate();
  const {cartItems} =useSelector((state)=>state.cart);

  const options=[
    {icon:<PersonIcon/>, name:"profile", func:userProfile},
    {icon:<ListAltIcon/>, name:"orders", func:orders},
    {icon:<ShoppingCartIcon style={{color: cartItems.length>0&&"rgb(240,198,1)"}}/>, name:`cart(${cartItems.length})`, func:cartFunc},
    

    {icon:<ExitToAppIcon/>, name:"logout", func:logoutUser},

  ];

  if(user.role==='admin')
  options.unshift(
  {icon:<DashboardIcon/>, name:"dashboard", func:dashboard});

  function dashboard(){
    nav("/admin/dashboard");
  }
  function logoutUser(){
    dispatch(logout());
    alert.success("Logged out successfully");
  }
  function orders(){
    nav("/orders");
  }
  function userProfile(){
    nav("/useraccount");
  }
  function cartFunc(){
    nav("/cart");
  }
  return (
    <>
    <Backdrop open={open} style={{zIndex:4}}/>
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        className="speedDial"
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        direction="down"
        style={{zIndex:5}}
        icon={
          <img 
          className='speedDialIcon'
          src={user.avatar.url ? user.avatar.url:'/profileIcon.png'}
          alt="Profile"/>
        }

      >
      {options.map((option)=>(
        <SpeedDialAction
        icon={option.icon} tooltipTitle={option.name} onClick={option.func} key={option.name}
        tooltipOpen={window.innerWidth<=600 ? true:false}
      />
      ))}


      </SpeedDial>

    </>
  )
}
