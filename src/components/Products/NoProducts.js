import React from 'react'
import {BiErrorCircle} from "react-icons/bi";
import "./NoProducts.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";


export const NoProducts = () => {
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
