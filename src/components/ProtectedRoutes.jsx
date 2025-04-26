
import { Navigate, Outlet} from "react-router-dom";



function ProtectedRoutes({jobs, applications}) {

    const authKey = sessionStorage.getItem("userId");

    return (authKey ? <Outlet context={[jobs, applications]}/> : <Navigate to="/login"/>)
}

export default ProtectedRoutes