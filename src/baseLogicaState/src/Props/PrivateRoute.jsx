import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

function PrivateRoute({children}) {
    const token = useSelector(state => state.authStore.token);
    if (!token) 
        return <Navigate to="/singIn" replace></Navigate>
    
    else 
        return children

}
export default PrivateRoute