import axios from "axios";


export default async function callAddPeep({textContent}){
    try{
        const response = axios.post("http://localhost:4000/peep/add-peep",
            {"textContent": textContent});
        return response;
    }catch(e){
        console.log("Couldn't post tweet");
        console.log(e);
    }
}