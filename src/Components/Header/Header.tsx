import { NavLink } from "react-router-dom";

const Header = () => {
    return ( 
        <header className="header">
            <div>logo</div>
            <div><NavLink to={"/library"}>Library</NavLink></div>
            <div><NavLink to={"/authors"}>Authors</NavLink></div>
            <div className="login_section">login</div>
        </header>
     );
}
 
export default Header;