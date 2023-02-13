import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../Redux/hooks";
import { registerRequest } from "../../Redux/slices/authSlice";

type Inputs = {
    username: string,
    password: string,
  };
interface Props {
    setRegisterVisible: Dispatch<SetStateAction<boolean>>
    setLoginVisible: Dispatch<SetStateAction<boolean>>
}


const Register = ({setRegisterVisible, setLoginVisible}:Props) => {
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        dispatch(registerRequest(data))
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

                <input className="login_submit" type="submit" value={'Register'} />

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