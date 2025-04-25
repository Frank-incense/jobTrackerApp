import { Children, createContext, useState } from "react"

let defaultAuth = false
export const AuthContext = createContext(defaultAuth);

function AuthContextProvider({children}){
    const [isAuth, setIsAuth] = useState(defaultAuth);

    return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContextProvider