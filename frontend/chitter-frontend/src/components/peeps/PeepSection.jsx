import Peep from "./peep/Peep.jsx";
import {useState} from "react";
import AddPeep from "./peep/AddPeep.jsx";


export default function PeepSection(){

    const [createPeep, setCreatePeep] = useState(false);

    const svgStyle = {
        position: 'fixed',  // Fixed position relative to the viewport
        bottom: '20px',     // 20px from the bottom of the viewport
        right: '20px',      // 20px from the right of the viewport
        cursor: 'pointer',  // Changes the cursor to indicate it's clickable
        zIndex: 1000        // Ensures it's above other elements
    };

    return(
        <>
            <div className="container" style={{minHeight: "100vh"}}>
                {createPeep && <AddPeep closeModal={() => setCreatePeep(false)}/>}
                <div className="row justify-content-center">
                    <div className="col-10 col-lg-7 justify-content-center align-items-center"
                         style={{background: "lightgray"}}>

                        <Peep/>
                        <Peep/>
                        <Peep/>
                        <Peep/>

                    </div>
                </div>
                <svg style={svgStyle} onClick={() => setCreatePeep(true)} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill={"white"}
                     className="bi bi-plus-square bg-primary" viewBox="0 0 16 16">
                    <path
                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path
                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
            </div>

        </>
    )
}