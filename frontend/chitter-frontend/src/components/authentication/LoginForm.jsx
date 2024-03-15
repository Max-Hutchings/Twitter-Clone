import {useState} from "react";
import callLoginEndpoint from "../../services/apis/LoginEndpoint.jsx";
import {navigate} from "jsdom/lib/jsdom/living/window/navigation.js";


export default function LoginForm(){

    const [login, setLogin] = useState(
        {
            "email": "",
            "password": "",
        }
    )

    async function submitLogin(){
        try{
            await callLoginEndpoint(login);
            navigate("/");
        } catch (e){
            console.error("Login error:", e);
            alert("Failed to Login. Please try again.");
        }
    }

    return(
        <>
            <form onSubmit={(e) => {e.preventDefault(); submitLogin();}}>
                <input
                    type="email"
                    className="form-control m-2"
                    value={login.email}
                    placeholder={"Email"}
                    onChange={(e) => setLogin({...login, email: e.target.value})}
                />

                <input
                    type="password"
                    className="form-control m-2"
                    value={login.password}
                    placeholder={"Password"}
                    onChange={(e) => setLogin({...login, password: e.target.value})}
                />
                <button className="btn btn-primary text-light w-100 m-2">
                    Login
                </button>

            </form>
        </>
    )
}