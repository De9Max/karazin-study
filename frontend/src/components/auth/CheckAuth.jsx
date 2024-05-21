import {Outlet} from "react-router-dom";
import {useGetMeQuery} from "../../features/user/userAPI.js";

export default function CheckAuth({children}) {
    const token = localStorage.getItem('token');
    const { isLoading } = useGetMeQuery(null, {
        skip: !token
    });

    if(isLoading) {
        return 'Loading...'
    }

    return children || <Outlet/>
}