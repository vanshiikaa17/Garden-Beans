import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../layout/loading/Loading";
import { MetaData } from "../layout/MetaData";
import { TopBar } from "./TopBar";
import { BsSpellcheck } from "react-icons/bs";
import "./updateUser.css";
import { RiPlantFill } from "react-icons/ri";
import "./updateUser.css";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_DETAILS_RESET } from "../../constants/userConstants";
export const UpdateUser = () => {
  const { loading, user, error } = useSelector((state) => state.userDetails);
  const { loading: updateLoading, isUpdated, error: updateError } = useSelector(
    (state) => state.allUsers
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Role updated successfully");
      dispatch({ type: UPDATE_USER_DETAILS_RESET });
      nav("/admin/users");
    }
  }, [error, id, user, dispatch, nav, alert, isUpdated, updateError]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <>
      <MetaData title="Garden Beans - ADMIN - Update Role" />

      <div className="dashBoardContainer">
        <div className="dashboardtopbar dashboardtopbarupdateUser">
          <TopBar />
        </div>

        <div className="updateUserContainer">
          <div className="updateUserBox">
            <h2>UPDATE USER ROLE</h2>
            {loading ? (
              <Loading />
            ) : (
              <form
                className="updateUserForm"
                encType="multipart/form-data"
                onSubmit={updateUserSubmitHandler}
              >
                <div className="inputFields">
                  <BsSpellcheck />
                  <input
                    className="updateUserInput"
                    type="text"
                    name="name"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="inputFields">
                  <BsSpellcheck />
                  <input
                    className="updateUserInput"
                    type="text"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="inputFields">
                  <RiPlantFill />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="updateUserInput"
                  >
                    <option value="">Choose Role</option>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="updateUserButton"
                  disabled={
                    updateLoading ? true : false || role === "" ? true : false
                  }
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
