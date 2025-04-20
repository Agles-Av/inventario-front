import { useReducer } from "react";
import AuthContext from "./AuthContext";
import { AuthReducer } from "./AuthReducer";

const init = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    
    return {
        isAuthenticated: !!token,
        token: token || null,
        user: user ? JSON.parse(user) : null,
        role: role || null,
    };
};


const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, {}, init);

    return (
        <AuthContext.Provider value={{user: state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;