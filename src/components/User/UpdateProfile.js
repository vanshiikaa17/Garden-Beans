import React, { useState, useEffect } from "react";

import "./updateProfile.css";
import { useNavigate } from "react-router-dom";
import { GrMail } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateDetails } from "../../actions/userProfileActions";
import { Loading } from "../layout/loading/Loading";
import { useAlert } from "react-alert";
import { MetaData } from "../layout/MetaData";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { loadUserDetails } from "../../actions/userActions";

export const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert=useAlert();
  const nav=useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profileIcon.png");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("profile updated successfully!");
      dispatch(loadUserDetails());
      nav(`/useraccount`);
      dispatch({ type: UPDATE_PROFILE_RESET }); // for implementing isUpdated=false
    }
  }, [error, alert, dispatch, isUpdated, nav, user]);

  const updateSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    dispatch(updateDetails(formData));
    console.log("changed");
  };

  const changeProfile = (e) => {
    e.preventDefault();
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setAvatar(fileReader.result);
          setAvatarPreview(fileReader.result);
        }
      };

      fileReader.readAsDataURL(e.target.files[0]);
    
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Garden Beans - Update profile"/>
          <div className="updateContainer">
            <div className="updateBox">
            <h2>UPDATE PROFILE</h2>
            <form
                className="updateForm"
                onSubmit={updateSubmitForm}
                encType="multipart/form-data"

              >
                <div className="inputFields">
                  <FaUserAlt />
                  <input
                    className="updateInput"
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
                <div className="inputFields">
                  <GrMail />
                  <input
                    className="updateInput"
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    name="email"
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </div>
               
                <div className="updateImageClass" id="updateImage">
                  <img src={avatarPreview} alt="Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={changeProfile}
                  />
                </div>
                <input type="submit" value="Update" className="updateButton" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
