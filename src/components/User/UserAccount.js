import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../layout/MetaData";
import { Loading } from "../layout/loading/Loading";
import { HiPencil } from "react-icons/hi";
import { FaListUl } from "react-icons/fa";

import "./userAccount.css";
export const UserAccount = () => {
  const nav = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      nav("/login");
    }
  }, [isAuthenticated, nav]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={user && `Profile - ${user.name}`} />
          {user && (
            <div className="profileContainer">
              <div className="left">
                <div className="profilePhoto">
                  <img src={user.avatar && user.avatar.url} alt={user.name} />
                  <p>Hello {user.name}!</p>
                </div>
                <div className="editOptions">
                <div>
                    <div>
                    MY ORDERS <FaListUl/>
                    </div>
                  <Link to="/orders">Orders</Link>
                </div>
                <div >
                    <div>
                    ACCOUNT SETTINGS <HiPencil/>

                    </div>
                  <Link to="/updatepassword">Change password</Link>
                  <Link to="/updateprofile">Edit Profile</Link>
                </div>
                </div>
              </div>

              <div className="right">
               <h1> Personal Information</h1>
                <div>
                  <h3>Name </h3>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h3>Email Address</h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3>Account created at </h3>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
               
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
