import React, { useState, useEffect } from "react";

import "./updatePassword.css";
import { useNavigate } from "react-router-dom";
import { FaUnlockAlt } from "react-icons/fa";
import { BsFillKeyFill } from "react-icons/bs";
import { GiConfirmed } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userProfileActions";
import { Loading } from "../layout/loading/Loading";
import { useAlert } from "react-alert";
import { MetaData } from "../layout/MetaData";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

export const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert=useAlert();
    const nav=useNavigate();
    const { loading, error, isUpdated } = useSelector(
      (state) => state.updateProfile
    );
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setconfirmNewPassword] = useState("");
  
    useEffect(() => {
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("password updated successfully!");
        nav(`/useraccount`);
        dispatch({ type: UPDATE_PASSWORD_RESET }); // for implementing isUpdated=false
      }
    }, [error, alert, dispatch, isUpdated, nav]);
  
    const updatePasswordForm = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.set("oldpassword", currentPassword);
      formData.set("newpassword", newPassword);
      formData.set("confirmnewpassword", confirmNewPassword);
      dispatch(updatePassword(formData));
      console.log("changed");
    };
  
    
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Garden Beans - Update password"/>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
            <h2>UPDATE PASSWORD</h2>
            <form
                className="updateForm"
                onSubmit={updatePasswordForm}
                encType="multipart/form-data"

              >
              <div className="inputFields">
                  <BsFillKeyFill />
                  <input
                    className="passwordInput"
                    type="password"
                    name="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e)=>{setCurrentPassword(e.target.value)}}
                  />
                </div>
                <div className="inputFields">
                  <FaUnlockAlt />
                  <input
                    className="passwordInput"
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e)=>{setNewPassword(e.target.value)}}
                  />
                </div><div className="inputFields">
                  <GiConfirmed />
                  <input
                    className="passwordInput"
                    type="password"
                    name="password"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e)=>{setconfirmNewPassword(e.target.value)}}
                  />
                </div>
                <input type="submit" value="Save Changes" className="updatePasswordButton" />
              </form>
            </div>
          </div>
        </>
      )}
    </>

  )
}
