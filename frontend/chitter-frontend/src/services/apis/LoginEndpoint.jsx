import axios from "axios";


export default async function callLoginEndpoint({email, password}){
    try{
        const response = await axios.post(
            "authentication/login",
            {
                "email": email,
                "password": password,
            });
        return response.data;
    }catch(e){
        console.log(`Login error: ` + e);
        return { error: e.response?.data || "Unknown error"};
    }
}