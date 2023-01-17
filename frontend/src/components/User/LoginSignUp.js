import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrMail } from "react-icons/gr";
import { FaUnlockAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import "./loginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser, signupUser } from "../../actions/userActions";
import { Loading } from "../layout/loading/Loading";
import { useAlert } from "react-alert";
import { MetaData } from "../layout/MetaData";

export const LoginSignUp = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const nav=useNavigate();
  const alert=useAlert();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profileIcon.png");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const loginFormRef = useRef(null);
  const switcherRef = useRef(null);
  const signupFormRef = useRef(null);

  const location=useLocation();
  const redirect=location.search?location.search.split("=")[1]:`useraccount`;

  useEffect(() => {
   if(error){
    console.log(error);

      alert.error(error);
    dispatch(clearErrors());
   }

   if(isAuthenticated){
    nav(`/${redirect}`);
   }
  }, [error ,alert, dispatch, isAuthenticated, nav, redirect]);
  

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherRef.current.classList.add("shiftToNeutral");
      switcherRef.current.classList.remove("shiftToRight");

      signupFormRef.current.classList.remove("shiftToNeutralForm");
      loginFormRef.current.classList.remove("shiftToLeft");
    }

    if (tab === "signup") {
      switcherRef.current.classList.add("shiftToRight");
      switcherRef.current.classList.remove("shiftToNeutral");
      signupFormRef.current.classList.add("shiftToNeutralForm");
      loginFormRef.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmitForm = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginEmail, loginPassword));
    console.log("submitted");
  };

  const signupSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(signupUser(formData));
    console.log("submitted");
  };

  const registerDataChange = (e) => {
    e.preventDefault();
    if (e.target.name === "avatar") {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setAvatar(fileReader.result);
          setAvatarPreview(fileReader.result);
        }
      };

      fileReader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={"Garden beans - Login"} />

          <div className="loginSignupContainer">
            <div className="loginSignupBox">
              <div>
                <div className="loginSignupToggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "signup")}>SIGN UP</p>
                </div>
                <button
                  ref={switcherRef}
                  className="loginRegisterToggle"
                ></button>
              </div>
              <form
                className="loginForm"
                ref={loginFormRef}
                onSubmit={loginSubmitForm}
              >
                <div className="inputFieldsLogin">
                  <GrMail />
                  <input
                    className="loginInput"
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => {
                      setloginEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="inputFieldsLogin">
                  <FaUnlockAlt />
                  <input
                    className="loginInput"
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => {
                      setloginPassword(e.target.value);
                    }}
                  />
                </div>
                <Link
                  to="/forgotpassword"
                  className="forgotPasswordLink"
                >
                  Forgot password?
                </Link>
                <input type="submit" value="Login" className="LoginButton" />
              </form>

              {/* signup form */}
              <form
                className="signupForm"
                ref={signupFormRef}
                onSubmit={signupSubmitForm}
                encType="multipart/form-data"
              >
                <div className="inputFields">
                  <FaUserAlt />
                  <input
                    className="signupInput"
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="inputFields">
                  <GrMail />
                  <input
                    className="signupInput"
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    name="email"
                    onChange={registerDataChange}
                  />
                </div>
                <div className="inputFields">
                  <FaUnlockAlt />
                  <input
                    className="signupInput"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signupImageClass" id="signupImage">
                  <img src={avatarPreview} alt="Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Sign up" className="SignupButton" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};
