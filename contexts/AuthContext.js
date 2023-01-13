import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

const initialState = {
    _id: '',
    email: '',
    name: '',
    username: '',
    accessToken: ''
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage('user', initialState)

    const loginUser = (authData) => setUser(authData);

    const logoutUser = () => setUser(initialState);

    return (
        <AuthContext.Provider value={{user, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const authState = useContext(AuthContext)
    return authState;
}