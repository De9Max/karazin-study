import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

export function ProtectedRoute({children, shouldLoggedIn = true, redirectPath = '/auth/register'}) {
    const user = useSelector(store => store.user.user)

    if (!user && shouldLoggedIn || user && !shouldLoggedIn) {
        return <Navigate to={redirectPath}/>;
    }

    return children || <Outlet/>;
}

export function AdminRoute({children, redirectPath = '/'}) {
    const user = useSelector(store => store.user.user)

    if (!user || !user?.admin) {
        return <Navigate to={redirectPath}/>;
    }

    return children || <Outlet/>;
}

export default {ProtectedRoute, AdminRoute};