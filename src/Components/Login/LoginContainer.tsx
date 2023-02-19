import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";
import Preloader from "../Common/Preloader";
import Login from "./Login";
import Register from "./Register";

const LoginContainer = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  const isLogging = useAppSelector((state) => state.auth.isLogging);
  const loginError = useAppSelector((state) => state.auth.loginError);
  const [loginVisible, setLoginVisible] = useState(true);
  const [registerVisible, setRegisterVisible] = useState(false);

  const showLogin = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
  };
  const showRegister = () => {
    setRegisterVisible(true);
    setLoginVisible(false);
  };


  const containerClass = loginVisible ? "" : "hide";
  return (
    <>
      {isAuthorized && <Navigate to={"/library"} />}
      {isLogging && <Preloader loadingText="Logging in..." />}
          <div className={`login_register_form_container`}>
            {loginVisible && (
              <Login
                showRegister={showRegister}
                isLogging={isLogging}
                loginError={loginError}
              />
            )}
            {registerVisible && (
              <Register
                showLogin={showLogin}
                isLogging={isLogging}
                loginError={loginError}
              />
            )}
          </div>
    </>
  );
};

export default LoginContainer;
