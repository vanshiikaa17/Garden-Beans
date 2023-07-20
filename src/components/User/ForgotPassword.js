import React, { useState, useEffect } from "react";

import "./forgotPassword.css";
import { GrMail } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userActions";
import { Loading } from "../layout/loading/Loading";
import { useAlert } from "react-alert";
import { MetaData } from "../layout/MetaData";


export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert=useAlert();
    const [email, setEmail] = useState("");
    const {error, loading, message } = useSelector(
      (state) => state.forgotPassword
    );

    const forgotPasswordSubmitForm = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.set("email", email);
        dispatch(forgotPassword(formData));
        console.log("sent");
      };
    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors);
      }

      if(message){
        alert.success(message);
      }
    }, [error, alert, dispatch, message])
    
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Garden Beans - Forgot Password"/>
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
            <h2>FORGOT PASSWORD</h2>
            <p>Enter your registered E-mail ID and we will send you a link to reset your account password</p>
            <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmitForm}

              >
                
                <div className="inputFields">
                  <GrMail />
                  <input
                    className="forgotPasswordInput"
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    name="email"
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
               
                
                <input type="submit" value="Send" className="forgotPasswordButton" />
              </form>
            </div>
          </div>
        </>
      )}
    </>

  )
}
