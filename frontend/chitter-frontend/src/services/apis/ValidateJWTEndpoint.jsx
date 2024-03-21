import axios from "axios";


export default async function callValidateJWT(){
    try{
        return await axios.get(
            "http://localhost:4000/authentication/login",
            {
                withCredentials: true
            });
    }catch (e){
        console.log("Failed to authenticateJWT");
        console.log(e);
    }
}