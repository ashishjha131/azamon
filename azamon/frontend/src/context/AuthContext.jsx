import {createContext, useState} from "react";


export const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    function login(token, user){
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
    }
    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    }
    return(
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;