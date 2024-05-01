import React, { useState, useEffect } from "react";

import "./resetPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaUnlockAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions";
import { Loading } from "../layout/loading/Loading";
import { useAlert } from "react-alert";
import { MetaData } from "../layout/MetaData";

export const ResetPassword = () => {
  
    const dispatch = useDispatch();
    const alert=useAlert();
    const nav=useNavigate();
    const {token}=useParams();
    const { loading, error, success } = useSelector(
      (state) => state.resetPassword
    );
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setconfirmNewPassword] = useState("");
  
    useEffect(() => {
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("password updated successfully!");
        nav(`/login`);
      }
    }, [error, alert, dispatch, success, nav]);
  
    const resetPasswordSubmitForm = (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.set("password", newPassword);
      formData.set("confirmPassword", confirmNewPassword);
      dispatch(resetPassword(token, formData));
      console.log("changed");
    };
  
    
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Garden Beans - Reset password"/>
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
            <h2>RESET PASSWORD</h2>
            <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmitForm}

              >
             
                <div className="inputFields">
                  <FaUnlockAlt />
                  <input
                    className="resetpasswordInput"
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e)=>{setNewPassword(e.target.value)}}
                  />
                </div>
                <div className="inputFields">
                  <GiConfirmed />
                  <input
                    className="resetpasswordInput"
                    type="password"
                    name="password"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e)=>{setconfirmNewPassword(e.target.value)}}
                  />
                </div>
                <input type="submit" value="Change Password" className="resetPasswordButton" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
