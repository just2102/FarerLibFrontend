import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { loginRequest } from "../../Redux/slices/authSlice";



type Inputs = {
    username: string,
    password: string,
  };
interface Props {
    showRegister: () => void

    isLogging: boolean
    loginError: string | null
}

const Login = ({showRegister, isLogging, loginError}:Props) => {
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(loginRequest(data))
    }
    const onShowRegister = () => {
        showRegister()
    }

    return ( 
        <form className={`login_form`} onSubmit={handleSubmit(onSubmit)}>
        <div className="login_container">
            <h4><label>Login</label></h4>
                <label className="login_label" htmlFor="username">Username</label>
                <input className="login_input" id="username" {...register("username", {minLength: {value:4, message:'Username should be longer than 4 symbols!'}, required: {value:true, message:"Username is required"}})} type="text" />
                {errors.username && <div className="login_input_error">{errors.username.message}</div> }

                <label className="login_label" htmlFor="password">Password</label>
                <input className="login_input" id="password" {...register("password", {minLength: {value:4, message:'Password cannot be shorter than 4 symbols!'}, maxLength: {value:15, message: "Max password length (15) reached"}, required: {value:true,message:"Password cannot be blank"}} )} type="password" />
                {errors.password && <div className="login_input_error">{errors.password.message}</div> }

                {loginError && <div>{loginError}</div> }
                <input disabled={isLogging} className={`login_submit ${isLogging && 'button_disabled'}`} type="submit" value={'Login'} />

                <div>Not registered?</div>
                <div><span onClick={onShowRegister}>Sign up</span> instead</div>
                <div className="testing_credentials">
                    Testing credentials:
                    <p>username</p>
                    <p>username</p>
                </div>
        </div>
        </form>
     );
}
 
export default Login;