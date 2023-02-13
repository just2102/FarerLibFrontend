import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { logoutRequest } from "../../Redux/slices/authSlice";

const Header = () => {
    const isAuthorized = useAppSelector(state=>state.auth.isAuthorized)
    const currentUser = useAppSelector(state=>state.auth.currentUser)
    const dispatch = useAppDispatch()

    const onLogoutClick = () => {
        dispatch(logoutRequest())
    }

    return ( 
        <header className="header">
            <div>logo</div>
            <div><NavLink to={"/library"}>Library</NavLink></div>
            <div><NavLink to={"/authors"}>Authors</NavLink></div>
            <div className="login_section"> 
                {!isAuthorized ? (
                    <NavLink to={"/login"}>Login</NavLink>
                    ) 
                : (
                <>
                <span>Hi, {currentUser?.username}</span>
                <a onClick={onLogoutClick}>Logout</a>
                </>
                )}
            </div>
        </header>
     );
}
 
export default Header;