import { useContext } from "react";
import { Navigate, Outlet} from "react-router-dom";
import { AuthContext } from "./AuthContextProvider";


function ProtectedRoutes({jobs}){

    const authKey = sessionStorage.getItem("userId");

    return (authKey ? <Outlet context={jobs}/> : <Navigate to="/login"/>)
}

export default ProtectedRoutes