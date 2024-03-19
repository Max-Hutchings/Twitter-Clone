import Peep from "./peep/Peep.jsx";
import {useEffect, useState} from "react";
import AddPeep from "./peep/AddPeep.jsx";
import callGetAllPeeps from "../../services/apis/GetPeepsEndpoint.jsx";
import NewPeepBtn from "./peep/NewPeepBtn.jsx";


export default function PeepSection(){

    const [createPeep, setCreatePeep] = useState(false);
    const [peeps, setPeeps] = useState([]);
    const [loading, setloading] = useState(true);


    useEffect(() => {
        const fetchPeeps = async () => {
            const data = await callGetAllPeeps();
            setPeeps(data.data);
            setloading(false);
        };

        fetchPeeps();
    }, []);

    useEffect(() => {
        console.log(peeps)
    },[loading])



    return(
        <>
            <div className="container" style={{minHeight: "100vh"}}>
                {createPeep && <AddPeep closeModal={() => setCreatePeep(false)}/>}
                <div className="row justify-content-center">
                    <div className="col-10 col-lg-7  justify-content-center align-items-center"
                         style={{background: "lightgray"}}>
                        {peeps.map((peep) => {
                            return(
                                <Peep textContent={peep.textContent} username={peep.accountId.username}/>
                            )
                        })}

                    </div>
                </div>
                <NewPeepBtn setCreatePeep={setCreatePeep} />
            </div>

        </>
    )
}