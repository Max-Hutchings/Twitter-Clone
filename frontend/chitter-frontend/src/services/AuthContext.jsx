import {useContext, useState, createContext, useEffect} from "react";


const AuthContext = createContext();

export function AuthProvider({children}){
    const [fName, setFName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);


    async function handleLogin({fName, lName, email, username}){
        setFName(fName);
        setlName(lName);
        setUsername(username);
        setEmail(email);
        setLoggedIn(true);
    }

    async function handleLogout(){
        setFName(null);
        setlName(null);
        setEmail(null);
        setUsername(null);
        setLoggedIn(false);
    }

    // Using useEffect here because state updates can be asynchronous
    useEffect(() => {
        console.log("State changed:");
        console.log(`Full name: ${fName} ${lName}`);
        console.log(`Email: ${email}`);
        console.log(`username: ${username}`);
        console.log(`Logged in: ${loggedIn}`);
    }, [fName, lName, email, username, loggedIn]);

    return(
        <AuthContext.Provider
            value={{fName, lName, email, username, loggedIn, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}

