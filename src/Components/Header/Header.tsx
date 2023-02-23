import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { logoutRequest } from "../../Redux/slices/authSlice";
import logo2 from "../../assets/logo2.png"

const Header = () => {
    const isAuthorized = useAppSelector(state=>state.auth.isAuthorized)
    const currentUser = useAppSelector(state=>state.auth.currentUser)
    const dispatch = useAppDispatch()

    const onLogoutClick = () => {
        dispatch(logoutRequest())
    }

    return ( 
        <header className="header">
            <div><a href="/"><img id="header_logo" src={"https://res.cloudinary.com/do6ggmadv/image/upload/v1676941335/logo2_hfvlcd.png"} alt="logo2" /></a></div>
            <div><NavLink to={"/library"}>Library</NavLink></div>
            {isAuthorized && <div><NavLink to={"/mybooks"}>My Books</NavLink></div> }
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