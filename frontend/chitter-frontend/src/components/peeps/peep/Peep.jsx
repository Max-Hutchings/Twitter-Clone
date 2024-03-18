import {Link} from "react-router-dom";


export default function Peep(){

    return(
        <>

                <div className="d-flex flex-column align-items-start justify-content-start p-3 m-2 rounded mb-3" style={{background: "white"}}>
                    <h6>
                        Username
                    </h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis ornare velit rutrum porttitor. Proin iaculis, ante a dictum interdum, quam dui tincidunt felis, ac sagittis enim lacus et lectus. Nam eget pretium ex. Ut ullamcorper, nibh in sagittis sollicitudin, sem ligula vulputate arcu, at pellentesque mi magna et nisl. </p>
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