import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import * as userService from '../services/userService'

const Logout = () => {
    const { user, logoutUser} = useContext(AuthContext);
    const router = useRouter()

    useEffect(() => {
        userService.logout(user.accessToken)
        .then(() => {
            logoutUser()
            router.push('/login')
        })
    }, [])
    return <Toaster position="top-center" />;
}

export default Logout
