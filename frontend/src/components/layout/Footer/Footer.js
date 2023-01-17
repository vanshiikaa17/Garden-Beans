import React from 'react'
import "./footer.css"
import Appstore from "./Appstore.png";
import Playstore from "./playstore.png" ;
import{FaInstagram,FaFacebookF,FaTwitter} from "react-icons/fa";

export const Footer = () => {
  return (
   <footer id="footer">
    <div className="top">
     
        <div className="images">
        <img className="footerimages"src={Appstore} alt="Appstore" />
        <img className="footerimages"src={Playstore} alt="playstore" />
        </div>
    </div>

    <div className="mid">
        <p>Copyright © 2022 VanshikaMohindra | All rights reserved</p>
    </div>

    <div className="bottom">
    <a href='https://react-icons.github.io/react-icons/search?q=fain'><FaInstagram/></a>
    <a href='https://react-icons.github.io/react-icons/search?q=fain'><FaFacebookF/></a>
    <a href='https://react-icons.github.io/react-icons/search?q=fain'><FaTwitter/></a>
    </div>
   </footer>
  )
}
