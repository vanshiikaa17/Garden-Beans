import React from 'react';
import {ReactNavbar} from 'overlay-navbar';
import{FaUserCircle,FaSearch,FaShoppingCart} from "react-icons/fa";
import logo from "../Header/G.png";

export const Header = () => {
  return (
    <ReactNavbar
    // burgerColor="rgb(240,198,1)"
    burgerColorHover="green"
    logo={logo}
    logoWidth="27.4rem"
    logoHoverColor="black"


    // burgerColorHover="rgb(30,30,28)"
    link1Text="Home"
    link2Text="Plants"
    link3Text="About"
    link4Text="Contact"

    link1Url="/"
    link2Url="/plants"
    link3Url="/about"
    link4Url="/contact"

    link1Size="2rem"
    link1ColorHover="green"
    link1Margin="1.2rem"

    navColor1="rgba(231, 221, 221)"

    searchIcon={true}
    SearchIconElement={FaSearch}
    searchIconColor="black"

    cartIcon={true}
    CartIconElement={FaShoppingCart}
    cartIconColor="black"
    cartIconUrl="/cart"
    
    profileIcon={true}
    ProfileIconElement={FaUserCircle}
    profileIconColor="black"
    profileIconUrl="/login"

    searchIconColorHover="green"
    cartIconColorHover="green"
    profileIconColorHover="green"

    searchIconMargin="0.6rem"
    cartIconMargin="0.6rem"
    profileIconMargin="0.6rem"

    />
  )
}
