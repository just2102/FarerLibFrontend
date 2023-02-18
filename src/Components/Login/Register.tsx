import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { registerRequest } from "../../Redux/slices/authSlice";

type Inputs = {
    username: string,
    password: string,
  };
interface Props {
    setRegisterVisible: Dispatch<SetStateAction<boolean>>
    setLoginVisible: Dispatch<SetStateAction<boolean>>

    isLogging: boolean
    loginError: string | null
}


const Register = ({setRegisterVisible, setLoginVisible, isLogging, loginError}:Props) => {
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [registerSuccessMessage, setRegisterSuccessMessage] = useState(false)
    const [registerFailureMessage, setRegisterFailureMessage] = useState(false)
    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        const response = await dispatch(registerRequest(data))
        if (response.payload===true) {
            setRegisterSuccessMessage(true)
        } else if (response.payload!==true) {
            setRegisterFailureMessage(true)
        }
    }
    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login_container">
            <h4><label>Register</label></h4>
                <label className="login_label" htmlFor="username">Username</label>
                <input className="login_input" id="username" {...register("username", {minLength: {value:4, message:'Username should be longer than 4 symbols!'}, required: {value:true, message:"Username is required"}})} type="text" />
                {errors.username && <div className="login_input_error">{errors.username.message}</div> }

                <label className="login_label" htmlFor="password">Password</label>
                <input className="login_input" id="password" {...register("password", {minLength: {value:4, message:'Password cannot be shorter than 4 symbols!'}, maxLength: {value:15, message: "Max password length (15) reached"}, required: {value:true,message:"Password cannot be blank"}} )} type="password" />
                {errors.password && <div className="login_input_error">{errors.password.message}</div> }

                {registerSuccessMessage && <div>Registered successfully!</div> }
                {registerFailureMessage && <div>{loginError}</div> }
                <input disabled={isLogging} className={`login_submit ${isLogging && 'button_disabled'}`} type="submit" value={'Register'} />

                <div>Already registered?</div>
                <div><span onClick={()=>{
                    setRegisterVisible(false);
                    setLoginVisible(true)
                }}>Log in</span> instead</div>
        </div>
        </form>
     );
}
 
export default Register;