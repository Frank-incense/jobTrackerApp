import { NavLink, useNavigate } from "react-router-dom";


function Navbar(){
    const navigate = useNavigate()

    function handleClick(e){
        sessionStorage.clear()
        navigate("/login")
    }

    return(
    <nav>
        <h1>JobTracker</h1>
        <NavLink to={"/job-listing"}>Jobs</NavLink>
        <NavLink to={"/user"}>Profile</NavLink>
        <NavLink to={"/applications"}>Applications</NavLink>
        <button type="button" onClick={handleClick}>
            Logout
        </button>
    </nav>)
}

export default Navbar