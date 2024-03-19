import {Link} from "react-router-dom";


export default function Peep({username, textContent}){

    return(
        <>

                <div className="d-flex flex-column align-items-start justify-content-start p-3 m-2 rounded mb-3" style={{background: "white"}}>
                    <h6>
                        {username}
                    </h6>
                    <p>{textContent}</p>
                    <div className="row justify-content-center w-100">
                        <div className="col-6 justify-content-center text-center">
                            <Link className={"text-center text-decoration-none"}>Comments</Link>
                        </div>
                        <div className="col-6 justify-content-center text-center ">
                            <Link className={"text-center text-decoration-none"}>Reply</Link>
                        </div>
                    </div>
                </div>


        </>
    )
}