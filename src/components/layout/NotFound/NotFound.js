import React from 'react'
import {BiErrorCircle} from "react-icons/bi";
import "./NotFound.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";


export const NotFound = () => {
  return (
    <div>
        <div className="PageNotFound">
      <BiErrorCircle />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
    </div>
  )
}
