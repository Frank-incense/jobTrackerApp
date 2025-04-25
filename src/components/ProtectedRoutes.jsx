import { useContext } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { AuthContext } from "./AuthContextProvider";


function ProtectedRoutes(){
    const authKey = sessionStorage.getItem("userId");

    return (authKey ? <Outlet/> : <Navigate to="/login"/>)
}

export default ProtectedRoutes