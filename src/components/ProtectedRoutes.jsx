
import { Navigate, Outlet} from "react-router-dom";



function ProtectedRoutes({jobs, applications, onAdd}) {

    const authKey = sessionStorage.getItem("userId");

    return (authKey ? <Outlet context={[jobs, applications, onAdd]}/> : <Navigate to="/login"/>)
}

export default ProtectedRoutes