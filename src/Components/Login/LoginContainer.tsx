import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";
import Preloader from "../Common/Preloader";
import Login from "./Login";
import Register from "./Register";

const LoginContainer = () => {
    const isAuthorized = useAppSelector(state=>state.auth.isAuthorized)
    const isLogging = useAppSelector(state=>state.auth.isLogging)
    const loginError = useAppSelector(state=>state.auth.loginError)
    const [loginVisible, setLoginVisible] = useState(true)
    const [registerVisible, setRegisterVisible] = useState(false)


    return (
        <>
        {isAuthorized && <Navigate to={"/library"}/> }
        {isLogging && <Preloader loadingText="Logging in..."/> }
        {loginVisible && <Login setRegisterVisible={setRegisterVisible} setLoginVisible={setLoginVisible} 
        isLogging={isLogging} loginError={loginError} />}
        
        {registerVisible && <Register setRegisterVisible={setRegisterVisible} setLoginVisible={setLoginVisible} 
        isLogging={isLogging} loginError={loginError}/> } 
        </>);
}
 
export default LoginContainer;